create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(50),
    contactNumber varchar(20),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
)


create table category(
    id int NOT NULL AUTO_INCREMENT,
    categoryName varchar(255) NOT NULL,
    subCategoryName varchar(255) NOT NULL,
    primary key(id),
    UNIQUE(categoryName)
)

--  Post category schema
create table postCategory(
    id int NOT NULL AUTO_INCREMENT,
    categoryName varchar(255) NOT NULL,
    subCategoryName varchar(255) NOT NULL,
    primary key(id),
    UNIQUE(categoryName)
)


create table products(
     id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    price       varchar(191),
    currency    varchar(191),
    unit        varchar(191),
    shortDesc   varchar(255),
    productDesc varchar(255),
    featureImg  varchar(255),
    primary key(id)
)


create table posts(
    id int not null AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    slug varchar(255),
    postDesc mediumtext,
    featureImg varchar(255),
    imgCaption varchar(255),
    focusKey varchar(255)
    metaDesc varchar(255)
    created_at timestamp default current_timestamp,
    updated_at datetime default current_timestamp on update current_timestamp

)