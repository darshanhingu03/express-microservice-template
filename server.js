import app from './src/app.js';
import logger from './src/utils/logger.js';
import { env as config } from './config/env.js';
import { testConnection } from './config/db.js';

// Start server
const PORT = config.PORT || 3000;
testConnection();
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`);
});
