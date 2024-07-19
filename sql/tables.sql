create table Users(
    id integer primary key,
    name varchar(30) not null,
    surname varchar(30) not null,
    username varchar(30) not null,
    email varchar(30) not null,
    password_hash varchar(30) not null,
    since date not null,
    comment varchar(4096),
    country varchar(30),
    city varchar(50),
    connections_number integer default 0,
    role varchar(20)
);

--BLocked table
create table Blocked(
    id integer primary key
    id_user integer references Users (id),
    id_blocked integer references Users (id)
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




