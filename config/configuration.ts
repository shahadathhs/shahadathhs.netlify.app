import dotenv from 'dotenv';

// * load the environment variables from the .env file
dotenv.config({ path: process.cwd() + '.env' });

const configuration = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongoURL: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
};

export default configuration;
