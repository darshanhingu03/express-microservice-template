import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_SYNC: process.env.DB_SYNC,
  API_PREFIX: process.env.API_PREFIX || '/api',
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'express-microservice',
  KAFKA_BROKERS: process.env.KAFKA_BROKERS
    ? process.env.KAFKA_BROKERS.split(',')
    : ['localhost:9092'],
  KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || 'express-microservice-group',
};
