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


create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price       varchar(191),
    currency    varchar(191),
    unit        varchar(191),
    shortDesc   varchar(255),
    roductDesc varchar(255),
    featureImg  varchar(255),
    primary key(id)
)