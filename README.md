# Shopify-Winter2022-Challenge

Technologies used: JavaScript, Node.js, Express.js, HTML/CSS/Bootsrap, Google-vision API, MySQL


## Features
* Upload Pictures
    * Maximum 10 pictures can be uploaded at once
    * .jpg .png .gif are accepted types
    * Name and description of the file can be entered during upload
    * User can upload a picture publicly or privatey
    * Guest cannot upload pictures

* Search filters
    * Labels (like: Night, Beauty, Happy, Street, Dog, Ice-cream etc)
    * Text present in a picture (OCR)
    * Name of the file entered during upload or the original filename
    * Extension of the picture
    * Pictures uploaded before and after a certain date
    * Maximum and minimum size of the picture in Bytes
    * Words present in description entered during upload.

* Delete Pictures
    * A user can delete only pictures uploaded by him/her/they

* View Pictures 
    * User can view public as well as pictures uploaded by him/her/they
    * Guest can only view public pictures

## Run Locally

Install node, npm and MySQL
```
https://nodejs.org/en/download/
https://www.mysql.com/downloads/
```

Run the following mysql queries 
```
create database shopifyWinter2022InternChallenge;
use shopifyWinter2022InternChallenge;

create table users(username VARCHAR(50) primary key, password VARCHAR(50) not null);

create table images(id INT primary key, name VARCHAR(50) not null, filepath VARCHAR(50) not null, extension VARCHAR(10) default 'jpg', size INT default 0, owner VARCHAR(50) default 'GUEST', visibility VARCHAR(8) default 'private', uploadDate DATE DEFAULT (curdate()), description VARCHAR(200));

create table imageLabels(imageId INT, label VARCHAR(50), PRIMARY KEY (imageId,label), FOREIGN KEY (imageId) REFERENCES images(id) ON DELETE CASCADE);

create table imageOCRs(imageId INT, text VARCHAR(200), PRIMARY KEY (imageId,text), FOREIGN KEY (imageId) REFERENCES images(id) ON DELETE CASCADE);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
<replace root, localhost and password with your credentials in the above query>
FLUSH PRIVILEGES;
```
Clone the project

```
git clone https://github.com/smitdesai1010/Shopify-Winter2022-Challenge.git
```

Add the following environment variables in a .env file located in the root directory of the project

<pre>
    <span>MYSQL_USERNAME</span>
    <span>MYSQL_PASSWORD</span>
    <span>MYSQL_HOST</span>
    <span>MYSQL_DATABASE</span>

    <a href="https://cloud.google.com/vision/docs/before-you-begin 
    ">GOOGLE_APPLICATION_CREDENTIALS</a>
</pre>

Note: Contact me if you are having trouble setting up GOOGLE_APPLICATION_CREDENTIALS, I will provide you my key for a temporary basis.
<br/>

Go to the project directory

```
npm install     
npm start   
```
Go to http://localhost:4500/


Run tests
```
npm test
```

## SQL SCHEMA

#### Table: users

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| username | VARCHAR(50) | PK |
| password | VARCHAR(50) | not null |


#### Table: images

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| id | INT | PK |
| name | VARCHAR(50) | not null |
| extension | VARCHAR(10) | default='jpg' |
| filepath | VARCHAR(200) | not null |
| size | INT | default = 0 |
| owner | VARCHAR(50) | default = 'GUEST' |
| visibility | VARCHAR(8) | default = 'private' |
| uploadDate | DATE | default = curdate() |
| description | VARCHAR(200) |  |


#### Table: imageLabels

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| imageId | INT | FK; references images.id |
| label | VARCHAR(50) | |
| | | PK = (imageId,label) |


#### Table: imageTexts

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| imageId | INT | FK; references images.id |
| text | VARCHAR(200) | |
| | | PK = (imageId,text) |





## Things Learnt

* Writing unit tests
* Handling files uploads using multer (node.js package)
* Using postman for testing APIs
* Using token authorization

