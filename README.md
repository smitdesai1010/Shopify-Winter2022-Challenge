# Shopify-Winter2022-Challenge
 
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


* GUEST can only view public images
* Prevents sql injection

* Unable to add certain link images in the shopify store