create table Users(
    id integer primary key,
    name varchar(30) not null,
    surname varchar(30) not null,
    username varchar(30) not null,
    email varchar(30) not null,
    password_hash varchar(30) not null,
    since datetime not null,
    comment varchar(4096),
    country varchar(30),
    city varchar(50),
    connections_number integer default 0,
    role varchar(20)
);

--BLocked table
create table Blocked(
    id integer primary key
    id_user integer references User (id),
    id_blocked integer references User (id)
);

--language part
create table Languages(
    id integer primary key,
    name varchar(30) unique,
    popularity integer not null default 0,
);

create table Users_Learning_Languages(
    id integer primary key,
    id_user integer references Users (id),
    id_language integer references Languages (id)
);

create table Users_Native_Languages(
    id integer primary key,
    id_user integer references Users (id),
    id_language integer references Languages (id)
);

--Post
create table Posts(
    id integer primary key,
    id_user integer references Users (id),
    id_language integer references Languages (id)
);

create table Users_Like_Posts(
    id integer primary key,
    id_user integer references Users (id),
    id_post integer references Posts (id)
);

--Connection
create table Connections(
    id integer primary key,
    id_first integer references Users (id),
    id_second integer references Users (id)
);

--Comments
create table Comments(
    id integer primary key,
    text varchar(4096) not null,
    id_post integer references Posts (id),
    id_user integer references Users (id)
);






--Indexes

--Users
create index users_id_index on Users (id);
create index blocked_users_index on Blocked(id_user, id_blocked);

--language
create index languages_id_index on Languages (id);
create index native_index on Users_Native_Languages (id_user);
create index learning_index on Users_Learning_Languages (id_user);

--Comments
create index comments_post_index on Comments (id_post);

--Posts
create index users_likes_posts_userid_index on Users_Like_Posts (id_user);
create index posts_userid_index on Posts (id_user);

--Connections
create index connections_first_id_index on Connections (id_first);
create index connections_second_id_index on Connections (id_second);


