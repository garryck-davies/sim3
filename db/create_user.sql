insert into users
(user_username, user_password)
values
($1, $2)
returning *;