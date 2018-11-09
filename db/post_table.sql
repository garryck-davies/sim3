create table post (
  post_id serial primary key,
  post_title varchar(45),
  post_img text,
  post_content text,
  author_id integer
)
