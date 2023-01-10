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
    FOREIGN KEY(productcategory)
    REFERENCE
    subCategoryName text,
    primary key(id)
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