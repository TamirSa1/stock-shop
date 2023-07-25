// יצירת דאטהבייס של סטור
CREATE DATABASE IF NOT EXISTS store;
// יצירת טבלה של יוזרס
// יצירת עמודות של איי.די, שם, מייל, טלפון וסיסמא
CREATE TABLE users
(      
    UserID AUTOINCREMENT PRIMARY KEY ,
    name VARCHAR(25),
    email VARCHAR(30),
    phone char(10),
    password varchar(12)
    
);

