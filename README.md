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
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

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

## Now Its Time to setup eslint and Prettier

[Follow This Article to Setup Eslint & Prettier](https://blog.logrocket.com/linting-typescript-eslint-prettier)

## Update package.json scripts

```json
{
  "scripts": {
    "build": "tsc",
    "lint": "eslint --ext .js,.ts .",
    "lint:fix": "npx eslint src --fix"
  }
}
```
