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


create table productcategory(
    id int NOT NULL AUTO_INCREMENT,
    categoryName varchar(255) NOT NULL,
    subCategoryName text NOT NULL,
    featureImg text NOT NULL,
    galleryImg text NOT NULL,
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


create table Header (
    id int Not null AUTO_INCREMENT,
    mainTitle text not null,
    secondTitle text,
    thirdTitle text,
    backgroundImg text not null,
    primary key(id)
)


create table products(
     id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    price       varchar(191),
    currency    varchar(191),
    unit        varchar(191),
    shortDesc   text,
    productDesc text,
    featureImg  text,
    gallaryImg  text,
    categoryName text,
    subCategoryName text,
    primary key(id)
)


create table posts(
    id int not null AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    slug varchar(255),
    postDesc mediumtext,
    featureImg varchar(255),
    imgCaption text,
    focusKey varchar(255),
    metaDesc varchar(255),
    alt varchar(255),
    status varchar(100),
    created_at timestamp default current_timestamp,
    updated_at datetime default current_timestamp on update current_timestamp,
primary key(id)
)


create table gallery (
     id int not null AUTO_INCREMENT,
     url text not null,
     primary key(id)
)



create table contacts (
     id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    emailTitle VARCHAR(255),
    comments VARCHAR(255) NOT NULL,
    productName VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    city VARCHAR(255),
    zipCode VARCHAR(255),
    productId varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)