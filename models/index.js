import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes } from 'sequelize';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load config manually (avoid import assertions)
const env = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, '../config/config.json');
const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const config = configFile[env];

console.log('Loaded DB config:', config);

const db = {};

// Init sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Dynamically import all models
const files = fs
  .readdirSync(__dirname)
  .filter(
    file => file !== path.basename(__filename) && file.endsWith('.js') && !file.endsWith('.test.js')
  );

for (const file of files) {
  const modelPath = path.join(__dirname, file);
  const modelModule = await import(`file://${modelPath}`);
  const defineModel = modelModule.default;

  if (typeof defineModel === 'function') {
    const model = defineModel(sequelize, DataTypes);
    db[model.name] = model;
  }
}

// Setup model associations
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
