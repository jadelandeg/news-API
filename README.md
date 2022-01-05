# Northcoders News API

Welcome to my News API!

I created this app to practice using new technology. This API is used to access news data from a database. I am trying to mimic the building of a backend service that would provide this information to the front end.

- Link to my hosted API: https://jade-landeg-news-api.herokuapp.com

My database is PSQL and I am interacting with it using node-postgres. I have created many endpoints in order for you to see articles, comments and users. You can edit existing or post new comments, articles and users. A full list of endpoints can be found at https://jade-landeg-news-api.herokuapp.com/api.

- Cloning my repo :

  - Write "git clone https://github.com/jadelandeg/news-API.git" in your terminal

- Minimum versions required:

  - Node must be 6.9.0 or higher
  - Postgres must be 14.0 or higher

- Installing dependencies :
  Run NPM i to install the dependencies listed below: - dotenv - express - jest - jest-sorted - pg - pg-format - sorted - supertest

- Run NPM seed to seed a new local database

- Run NPM test to run all of my tests, made using jest and supertest

- Create two files to allow the app to change between development and test environments

  - .env.development
    - This file should contain "PGDATABASE=nc_news"
  - .env.test
    - This file should contain "PGDATABASE=nc_news_test"
