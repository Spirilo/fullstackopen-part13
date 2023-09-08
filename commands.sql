CREATE TABLE blogs(
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL, 
  title text NOT NULL, 
  likes integer DEFAULT 0
);

insert into blogs (url, title, likes) values ('https://iamafoodblog.com', 'i am a food blog', 0);

insert into blogs (url, title, likes) values ('https://www.wanderingearl.com/', 'Wandering Earl', 0);