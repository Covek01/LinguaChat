import { Delete, Inject, Injectable, UseGuards } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  DataSource,
  DeleteResult,
  InsertResult,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import {
  UserGetDto,
  UserGetDtoProfile,
  UserInsertDto,
  UserInterface,
  UserUpdateDto,
} from '../../models/user.types';

import { User } from './user.entity';
import { sha1 } from '../auth/sha1.hash';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth/auth.guard';
import { Blocking } from './blocking.entity';
import { Language } from '../language/language.entity';
import { UserLearningLanguage } from './UserLearningLanguage.entity';
import {
  LanguageInterface,
  LanguageWithLearningLevel,
} from 'src/models/language.types';
import { removePassHash } from 'src/utils/user.utils';
import { Connection } from '../connection/connection.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource('postgresConnection') private dataSource: DataSource,
  ) {}

  async get(userId: number): Promise<UserGetDto> {
    const user: User = await this.dataSource.getRepository(User).findOne({
      where: {
        id: userId,
      },
    });
    const userDto: UserGetDto = plainToInstance(UserGetDto, user, {
      excludeExtraneousValues: true,
    });
    return userDto;
  }

  async getUserForProfile(userId: number): Promise<UserGetDtoProfile> {
    const user: User = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.blockedUsers', 'usersBlocking')
      .leftJoinAndSelect('usersBlocking.blockedUser', 'blockedUser')
      .leftJoinAndSelect('user.userLanguagesLearning', 'userLanguagesLearning')
      .leftJoinAndSelect('userLanguagesLearning.language', 'language')
      .leftJoinAndSelect('user.languagesNative', 'languagesNative')
      .where('user.id = :userId', { userId })
      .getOne();
    const { passHash, ...userDto } = user;
    return userDto;
  }

  async getUsersWhoAreBlockedByUser(userId: number): Promise<UserGetDto[]> {
    const blockedUsers: Blocking[] = await this.dataSource
      .getRepository(Blocking)
      .createQueryBuilder('blocking')
      .leftJoinAndSelect('blocking.blockedUser', 'blockedUser')
      .where('blocking.userId = :userId', { userId })
      .getMany();

    const blockedUsersMapped = blockedUsers
      .map((obj) => obj.blockedUser)
      .map((objUser) => {
        const { passHash, ...userWithoutPassHash } = objUser;
        return userWithoutPassHash;
      });
    console.log(blockedUsers);
    return blockedUsersMapped;
  }

  async getHiddenUsers(userId: number): Promise<UserGetDto[]> {
    const blockedUsers: Blocking[] = await this.dataSource
      .getRepository(Blocking)
      .createQueryBuilder('blocking')
      .leftJoinAndSelect('blocking.user', 'userWhoBlocked')
      .leftJoinAndSelect('blocking.blockedUser', 'blockedUser')
      .where('blocking.userId = :userId', { userId })
      .orWhere('blocking.blockedId = :blockedUserId', { blockedUserId: userId })
      .getMany();

    const blockedUsersMapped = blockedUsers
      .map((blocking) =>
        blocking.user.id === userId ? blocking.blockedUser : blocking.user,
      )
      .map((objUser) => {
        const { passHash, ...userWithoutPassHash } = objUser;
        return userWithoutPassHash;
      });
    console.log(blockedUsers);
    return blockedUsersMapped;
  }

  async getFilteredUsersByLanguage(
    userId: number,
    languageId: number,
  ): Promise<UserGetDto[]> {
    const users: User[] = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .orderBy('user.time', 'DESC')
      .leftJoinAndSelect('user.languagesNative', 'languageNative')
      .leftJoinAndSelect('user.blockedUsers', 'blockedUser')
      .leftJoinAndSelect('user.usersBlocking', 'userBlocking')
      .where('languageNative.id = :languageId', { languageId })
      .andWhere(
        '(blockedUser.id IS NULL OR blockedUser.id != :userId) AND (userBlocking.id IS NULL OR userBlocking.id != :userId)',
        {
          userId,
        },
      )
      .getMany();

    const filteredUsers = users.map((user) => {
      const { passHash, ...userWithoutPassHash } = user;
      return userWithoutPassHash;
    });
    console.log(filteredUsers);
    return filteredUsers;
  }

  async getFilteredUsersByLanguageCount(
    userId: number,
    languageId: number,
  ): Promise<number> {
    const count: number = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .orderBy('user.time', 'DESC')
      .leftJoinAndSelect('user.languagesNative', 'languageNative')
      .leftJoinAndSelect('user.blockedUsers', 'blockedUser')
      .leftJoinAndSelect('user.usersBlocking', 'userBlocking')
      .where('languageNative.id = :languageId AND user.id != :myUserId', {
        languageId,
        myUserId: userId,
      })
      .andWhere(
        '(blockedUser.id IS NULL OR blockedUser.id != :userId) AND (userBlocking.id IS NULL OR userBlocking.id != :userId)',
        {
          userId,
        },
      )
      .getCount();

    return count;
  }

  async getFilteredUsersByLanguagePagination(
    userId: number,
    languageId: number,
    limit: number,
    offset: number,
  ): Promise<UserGetDto[]> {
    const forbiddenUserPairs: Blocking[] = await this.dataSource
      .getRepository(Blocking)
      .createQueryBuilder('blocking')
      .innerJoinAndSelect('blocking.user', 'user')
      .innerJoinAndSelect('blocking.blockedUser', 'blockedUser')
      .where('user.id = :userId', { userId })
      .orWhere('blockedUser.id = :blockedUserId', { blockedUserId: userId })
      .getMany();

    const forbiddenUserIds: number[] = forbiddenUserPairs.map(
      (userPair: Blocking): number => {
        return userPair.user.id === userId
          ? userPair.blockedUser.id
          : userPair.user.id;
      },
    );

    console.log(forbiddenUserIds);

    let query: SelectQueryBuilder<User> = this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .orderBy('user.since', 'DESC')
      .leftJoinAndSelect('user.languagesNative', 'languageNative')
      .where('languageNative.id = :languageId AND user.id != :myUserId', {
        languageId,
        myUserId: userId,
      });

    if (forbiddenUserIds.length > 0) {
      query = query.andWhere('user.id NOT IN (:...forbiddenUserIds)', {
        forbiddenUserIds,
      });
    }

    query = query.limit(limit).offset(offset);

    const users: User[] = await query.getMany();

    const filteredUsers: UserGetDto[] = users.map((user: User): UserGetDto => {
      const { passHash, ...userWithoutPassHash } = user;
      return userWithoutPassHash;
    });

    return filteredUsers;
  }

  async getByUsername(username: string): Promise<User> {
    const user: User = await this.dataSource.getRepository(User).findOne({
      where: {
        username: username,
      },
    });
    console.log(`Ovde je onaj sto se nece vraca User ${user}`);
    return user;
  }

  async delete(id: number): Promise<number> {
    const result: DeleteResult = await this.dataSource
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();

    if (result.affected === 0)
      throw new Error(`User with id ${id} isn't deleted or doesn't exist`);

    return id;
  }

  async addCommentAboutUser(
    userId: number,
    user_comment: string,
  ): Promise<string> {
    const result: DeleteResult = await this.dataSource
      .getRepository(User)
      .update({ id: userId }, { comment: user_comment });

    if (result.affected === 0)
      return `User with id ${userId} isn't updated or doesn't exist`;

    return `User with id ${userId} got a new comment`;
  }

  async updateUserInfo(user: UserGetDto): Promise<UserGetDto> {
    console.log('TAKNUT SAM');
    const { id, ...userWithoutId } = user;
    const result: UpdateResult = await this.dataSource
      .getRepository(User)
      .update({ id: user.id }, userWithoutId);
    if (result.affected === 0) return new UserGetDto();

    return user;
  }

  async blockUser(blockerId: number, blockedId: number): Promise<UserGetDto> {
    if (blockerId === blockedId) {
      throw new Error('IDS ARE THE SAME. An user cannot block himself');
    }

    return await this.dataSource
      .transaction(async (transactionEntityManager) => {
        transactionEntityManager
          .createQueryBuilder()
          .delete()
          .from(Connection)
          .where(
            '(first_id = :firstId AND second_id = :secondId) OR (first_id = :secondId AND second_id = :firstId)',
            { firstId: blockerId, secondId: blockedId },
          )
          .execute();

        const blocker: User = await this.dataSource
          .getRepository(User)
          .findOne({
            where: {
              id: blockerId,
            },
          });

        const blocked: User = await this.dataSource
          .getRepository(User)
          .findOne({
            where: {
              id: blockedId,
            },
          });

        const result: InsertResult = await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(Blocking)
          .values({
            user: blocker,
            blockedUser: blocked,
          })
          .execute();

        const blockedUser = removePassHash(blocked);

        return blockedUser;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async unblockUser(blockerId: number, blockedId: number): Promise<string> {
    const result: DeleteResult = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Blocking)
      .where('userId = :blockerId', { blockerId: blockerId })
      .andWhere('blockedId = :blockedId', { blockedId: blockedId })
      .execute();
    if (result.affected > 0)
      return `Unblocking added successfully, blocker: ${blockerId}, blocked: ${blockedId}`;
    else return 'No rows affected';
  }

  async insertLanguageNative(
    userId: number,
    language_id: number,
  ): Promise<LanguageInterface> {
    await this.dataSource
      .createQueryBuilder()
      .relation(User, 'languagesNative')
      .of(userId)
      .add(language_id);

    const language: Language = await this.dataSource
      .getRepository(Language)
      .findOne({
        where: {
          id: language_id,
        },
      });

    return language;
  }

  async removeLanguageNative(
    userId: number,
    language_id: number,
  ): Promise<string> {
    await this.dataSource
      .createQueryBuilder()
      .relation(User, 'languagesNative')
      .of(userId)
      .remove(language_id);

    return 'Native language removed successfully';
  }

  async insertLanguageLearning(
    userId: number,
    language_id: number,
    level: string,
  ): Promise<LanguageWithLearningLevel> {
    const user: User = await this.dataSource.getRepository(User).findOne({
      where: {
        id: userId,
      },
    });

    const language: Language = await this.dataSource
      .getRepository(Language)
      .findOne({
        where: {
          id: language_id,
        },
      });

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(UserLearningLanguage)
      .values({
        user: user,
        language: language,
        level: level,
      })
      .orUpdate(['level'], ['language_id', 'user_id'])
      .execute();

    const languageLearning = await this.dataSource
      .getRepository(UserLearningLanguage)
      .createQueryBuilder('UserLearningLanguage')
      .where('UserLearningLanguage.language_id = :languageId', {
        languageId: language_id,
      })
      .getCount();

    language.popularity = languageLearning;
    await this.dataSource.manager.save(language);

    const languageWithLevelLearning: LanguageWithLearningLevel =
      new LanguageWithLearningLevel(
        language.id,
        language.name,
        language.popularity,
        level,
      );

    return languageWithLevelLearning;
  }

  async removeLanguageLearning(
    userId: number,
    language_id: number,
  ): Promise<LanguageInterface> {
    const language: Language = await this.dataSource
      .getRepository(Language)
      .findOne({
        where: {
          id: language_id,
        },
      });

    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(UserLearningLanguage)
      .where('user_id = :userId', { userId: userId })
      .andWhere('language_id = :languageId', { languageId: language_id })
      .execute();

    const languageLearning = await this.dataSource
      .getRepository(UserLearningLanguage)
      .createQueryBuilder('UserLearningLanguage')
      .where('UserLearningLanguage.language_id = :languageId', {
        languageId: language_id,
      })
      .getCount();

    language.popularity = languageLearning;
    await this.dataSource.manager.save(language);

    return language;
  }
}
