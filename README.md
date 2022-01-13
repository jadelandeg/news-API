# Northcoders News API

Welcome to my News API!

This API was created to practice using new technology. It is a backend API service that is used to access news data from a database and provide the information to the frontend

- Link to hosted API: https://jade-landeg-news-api.herokuapp.com

The database uses node-postgres to interact with PSQL. There are many endpoints in order for you to see articles, comments and users. You can edit existing or post new comments, articles and users. A full list of endpoints can be found at https://jade-landeg-news-api.herokuapp.com/api.

- Cloning the repo :

  - Write "git clone https://github.com/jadelandeg/news-API.git" in your terminal

- Minimum versions required:

  - Node must be 6.9.0 or higher
  - Postgres must be 14.0 or higher

- Installing dependencies :
  Run NPM i to install the dependencies listed below:

  - dotenv
  - express
  - jest
  - jest-sorted
  - pg
  - pg-format
  - sorted
  - supertest

- Run NPM seed to seed a new local database

- Run NPM test to run all tests, made using jest and supertest

- Create two files to allow the app to change between development and test environments

  - .env.development
    - This file should contain "PGDATABASE=nc_news"
  - .env.test
    - This file should contain "PGDATABASE=nc_news_test"
