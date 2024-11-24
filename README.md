# Prueba Técnica Backend

## Project Overview

This is the backend of the **Prueba Técnica** project built with **Express.js** and **TypeScript**. The project provides an API with Swagger documentation, rate limiting, CORS handling, and more.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development Setup](#development-setup)
- [API Documentation](#api-documentation)

## Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd prueba-tecnica-backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file for environment variables. Example:
   ```env
   DATABASE_URL=test
   DB_NAME=test
   PORT=3000
   ```

## Scripts

### Build the project

Compile TypeScript files to JavaScript.

```bash
npm run build
```

### Start the application

Run the application in production mode (compiled files in `dist` folder).

```bash
npm start
```

### Run in development mode

Run the application using `ts-node` (useful for development, no need to compile TypeScript).

```bash
npm run dev
```

## Dependencies

- **express**: A minimal and flexible Node.js web application framework.
- **typescript**: TypeScript language support.
- **ts-node**: TypeScript execution environment for Node.js.
- **dotenv**: Loads environment variables from a `.env` file.
- **mongodb**: MongoDB Node.js driver.
- **@types/express**: TypeScript types for Express.js.
- **@types/mongodb**: TypeScript types for MongoDB.
- **swagger-jsdoc**: Generates Swagger API documentation from JSDoc comments.
- **swagger-ui-express**: Serves Swagger UI for the API documentation.
- **helmet**: Helps secure your Express app by setting various HTTP headers.
- **cors**: CORS middleware for Express.js.
- **express-rate-limit**: Rate limiting middleware for Express.js.
- **joi**: Object schema validation.
- **zod**: TypeScript-first schema validation.

## Development Setup

1. **TypeScript Setup**: The project is written in TypeScript. Make sure you have TypeScript and its type definitions installed.
2. **Running Locally**:
   - Install dependencies by running `npm install`.
   - Run the app in development mode using `npm run dev`.
   - Visit `http://localhost:3000/api` to test the application.

## API Documentation

This API uses **Swagger** to generate interactive API documentation. You can access the documentation at:

- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
