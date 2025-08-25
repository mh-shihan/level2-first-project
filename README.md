# Backend Project Setup using TypeScript

## Install node

```bash
npm init -y
```

## Install TypeScript

```bash
npm install typescript --save-dev
```

## Initialize TypeScript configuration

```bash
tsc -init
```

## Install Express.js

```bash
npm install express
```

## Install Mongoose

```bash
npm install mongoose
```

## Install Dotenv for environment variables

```bash
npm install dotenv
```

## Install Cors

```bash
npm install cors
```

## Install TypeScript types for Node.js and Express

```bash
npm install @types/node @types/express @types/cors --save-dev
```

## Setup dotenv config

Create a `app\config\index.ts` file in the src directory of your project:

```typescript
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
```

## Server Set Up

Create a `\server.ts` file in the src directory of your project:

```typescript
import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
```

## Install Nodemon

```bash
npm install nodemon --save-dev
```

## Now's time to set up ESLint and Prettier

[Follow This Article to Set Up ESLint & Prettier](https://blog.logrocket.com/linting-typescript-eslint-prettier)

## Install ts-node-dev to run TypeScript files directly

```bash
npm install ts-node-dev --save-dev
```

## Update the package.json scripts

```json
{
  "scripts": {
    "start:prod": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "lint": "eslint --ext .js,.ts .",
    "lint:fix": "npx eslint src --fix",
    "prettier": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## Use the Validator library for string validation.

## Use Zod of Joi for validation. Zod is preferred.

## Install Bcrypt for password hashing

```bash
npm install bcrypt
npm install -D --save @types/bcrypt
```

# Deployment

## 2 Ways to deploy

### 1. Vercel CLI

First, build the project using

```bash
npm run build
or
tsc
```

Then, create a file at the root called `vercel.json`, write the following code

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

After that, install Vercel (If already installed, then no need to install

```bash
npm i -g vercel
```

Check Vercel version

```bash
vercel -v
```

For Vercel Login

```bash
vercel login
```

Now, it's mandatory

```bash
vercel --prod
```

```node
require('crypto').randomBytes(64).toString('hex');
```

#### 2. GitHub
