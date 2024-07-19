import { Controller, Param } from '@nestjs/common';
import { UserInterface } from '../../../../models'
import { UserService } from './user.service';
import {Get} from '@nestjs/common'

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get(':id')
    get(@Param('id') id: string): UserInterface {
        return this.userService.get(parseInt(id, 0));
    }
}
