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

