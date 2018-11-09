insert into post
(post_title, post_img, post_content)
values
($1, $2, $3)
returning *;