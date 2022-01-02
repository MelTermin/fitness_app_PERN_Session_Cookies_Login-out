CREATE TABLE users (
  id serial not null primary key,
  user_name varchar(255) not null,
  user_email varchar(255) not null unique,
  user_password varchar(255) not null
);

CREATE TABLE tracker_form (
  tracker_form_id serial not null primary key,
  exercise VARCHAR(200),
  repetition VARCHAR(200),
  weight VARCHAR(200),
  duration VARCHAR(200),
  date DATE DEFAULT CURRENT_DATE,
  user_id serial not null references users(id)
);