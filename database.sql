create table users(userid serial, username varchar(16) not null unique, pass varchar(255) not null, primary key(userid))

Create table recipes(recipeid serial, title text not null, 
					description text not null, ingridients text not null,
					directions text not null, imagename VARCHAR not null, 
					userid int not null, primary key(recipeid), 
					constraint fk_recipe_user foreign key(userid) References users(userid) 
					on delete cascade);

alter table recipes alter column imagename set default 'default.png';


alter table recipes add column createdat TIMESTAMPTZ default now();


