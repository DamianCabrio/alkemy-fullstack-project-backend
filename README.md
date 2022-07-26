<div align="center">

  <img src="https://raw.githubusercontent.com/DamianCabrio/alkemy-fullstack-project-frontend/main/src/assets/images/logo.svg" alt="logo" width="200" height="auto" />
  <h1>Tus Finanzas - Alkemy Fullstack Challenge - Backend</h1>
  
  <p>
    Backend side of the Alkemy Fullstack Challenge made with Node.js, express, and other libraries.
  </p>
  
  
<!-- Badges -->
<p>
  <a href="https://github.com/DamianCabrio/alkemy-fullstack-project-backend/graphs/contributors" target="_blank">
    <img src="https://img.shields.io/github/contributors/DamianCabrio/alkemy-fullstack-project-backend" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/DamianCabrio/alkemy-fullstack-project-backend" alt="last update" target="_blank" />
  </a>
</p>
   
<h4>
    <a href="https://tus-finanzas-client.herokuapp.com" target="_blank">View Demo</a>
  <span> · </span>
    <a href="https://github.com/DamianCabrio/alkemy-fullstack-project-frontend" target="_blank">Front Repo</a>
  <span> · </span>
    <a href="https://drive.google.com/file/d/1xR92xRBg8uQDbdajch0sVb9xa4VtHXtU/view" target="_blank">Assignment</a>
  <span> · </span>
    <a href="https://www.alkemy.org/" target="_blank">Alkemy</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# 📔 Table of Contents

- [About the Project](#🌟-about-the-project)
  - [Tech Stack](#👾-tech-stack-of-the-project)
  - [Features](#🎯-features)
  - [Routes](#🚌-routes)
  - [Environment Variables](#🔑-environment-variables)
- [Getting Started](#🧰-getting-started)
  - [Prerequisites](#‼-prerequisites)
  - [Run Locally](#🏃-run-locally)
  - [Deployment](#🚩-deployment)
- [Contact](#👋-contact)
- [Acknowledgements](#💎-acknowledgements)

<!-- About the Project -->

## 🌟 About the Project

<div align="center"> 
  <img src="https://i.ibb.co/9skyV9j/imagen.png" alt="screenshot" />
</div>

<!-- TechStack -->

### 👾 Tech Stack of the Project

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://axios-http.com/" target="_blank">Axios</a></li>
    <li><a href="https://moment.github.io/luxon/#/" target="_blank">Luxon</a></li>
    <li><a href="https://necolas.github.io/normalize.css/" target="_blank">normalize.css</a></li>
    <li><a href="https://reactjs.org/" target="_blank">React.js</a></li>
    <li><a href="https://reactrouter.com/" target="_blank">React Router</a></li>
    <li><a href="https://recharts.org/en-US/" target="_blank">Recharts</a></li>
    <li><a href="https://styled-components.com/" target="_blank">Styled components</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/" target="_blank">Express.js</a></li>
    <li><a href="https://knexjs.org/" target="_blank">Knex.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mysql.com/" target="_blank">MySQL</a></li>
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://www.docker.com/" target="_blank">Docker</a></li>
  </ul>
</details>

<!-- Features -->

### 🎯 Features

- [🔐] JWT authentication
- [⛔] Error handling
- [✅] Body validation
- [💻] Database integration

### 🚌 Routes

- /api/v1
  - /users
    - [POST] /register
    - [POST] /login
    - [PUT] /update
    - [PUT] /update-password
  - /transactions
    - [GET] /
    - [GET] /:id
    - [GET] /stats
    - [POST] /add
    - [PUT] /:id
    - [DELETE] /:id
  - /categories
    - [GET] /
    - [GET] /:id
  - /transaction-types
    - [GET] /
    - [GET] /:id

Insomnia collection: [Link](https://drive.google.com/file/d/1jsLPSpWC9GUF3begImp25CS0rc4oNgKY/view?usp=sharing)

<!-- Env Variables -->

### 🔑 Environment Variables

To run this project, you will need to copy the file `.env.example` to `.env` and fill in the values.

`DB_DATABASE`: The name of the database.

`DB_USER`: The username of the database.

`DB_PASS`: The password of the database.

`DB_HOST`: The host of the database.

`DB_CLIENT`: The client of the database used by knex.js. By default 'mysql2', this is the only client that was tested.

`PORT`: The port of the server, by default '5000'.

`JWT_SECRET`: The secret used to generate the JWT.

`JWT_EXPIRATION`: The expiration time of the JWT, by default '1d'.

`NODE_ENV`: The environment of the project, by default 'development'. Change when deploying

<!-- Getting Started -->

## 🧰 Getting Started

<!-- Prerequisites -->

### ‼ Prerequisites

This project uses npm as package manager, so you need to have it installed.
You can get it at <a href="https://nodejs.org/en/" target="_blank">nodejs.org</a>

<!-- Run Locally -->

### 🏃 Run Locally

Clone the project

```bash
  git clone https://github.com/DamianCabrio/alkemy-fullstack-project-backend.git
```

Go to the project directory

```bash
  cd alkemy-fullstack-project-backend
```

Install dependencies

```bash
  npm install
```

Configure the environment variables, and migrate the database

```bash
  npm run migrate
```

Start the server

```bash
  npm start
```

Or

```bash
  npm run dev
```

<!-- Deployment -->

### 🚩 Deployment

The deployment of the app was made with heroku.

This repository is connected to the heroku app `tus-finanzas-backend`.
You can visit it at <a href="https://tus-finanzas-api.herokuapp.com/" target="_blank">tus-finanzas-api.herokuapp.com</a>

<!-- Contact -->

## 👋 Contact

<a href="https://github.com/DamianCabrio/alkemy-fullstack-project-backend/graphs/contributors" target="_blank">
  <img src="https://contrib.rocks/image?repo=DamianCabrio/alkemy-fullstack-project-backend" />
</a>

Damián Cabrio - [LinkedIn](https://www.linkedin.com/in/dami%C3%A1n-cabrio-4542801b9/) - soy@damiancabrio.com.ar

<!-- Acknowledgments -->

## 💎 Acknowledgements

- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [Express rate limit](https://www.npmjs.com/package/express-rate-limit)
- [Express validator](https://www.npmjs.com/package/express-validator)
- [Helmet](https://www.npmjs.com/package/helmet)
- [Http status codes](https://www.npmjs.com/package/http-status-codes)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Knex.js](https://www.npmjs.com/package/knex)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Mysql2](https://www.npmjs.com/package/mysql2)
- [XSS clean](https://www.npmjs.com/package/xss-clean)
