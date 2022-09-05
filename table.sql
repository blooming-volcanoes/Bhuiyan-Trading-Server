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
    primary key(id)
)


create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),

    price       varchar(255)
    currency    varchar(255)
    unit        varchar(255)
    shortDesc   varchar(255)
    ProductDesc varchar(255)
    FeatureImg  varchar(255)?
    status varchar(50),
    primary key(id)
)