// /config/db.js
import { Sequelize } from 'sequelize';
import logger from '../src/utils/logger.js';
import { env as config } from './env.js';
// Fail-fast checks for required env variables
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
requiredEnvVars.forEach(key => {
  if (!process.env[key]) {
    logger.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  port: config.DB_PORT || 5432,
  dialect: 'postgres',
  logging: msg => logger.debug(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test the connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Initialize models and their relationships
export const initModels = async () => {
  const modelsModule = await import('../models/index.js');
  const models = modelsModule.default || modelsModule;

  Object.values(models).forEach(model => {
    if (typeof model.initialize === 'function') {
      model.initialize(sequelize);
    }
  });

  Object.values(models).forEach(model => {
    if (typeof model.associate === 'function') {
      model.associate(models);
    }
  });

  if (process.env.NODE_ENV === 'development' && process.env.DB_SYNC === 'true') {
    await sequelize.sync({ alter: true });
    logger.info('Database synchronized');
  }
};

export { sequelize };
