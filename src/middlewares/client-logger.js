import logger from '../utils/logger.js';

export const clientIpLogger = (req, _, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
  logger.info(`Client IP: ${clientIp}`);
  next();
};

export const clientBrowser = (req, _, next) => {
  const userAgent = req.headers['user-agent'] || 'Unknown';
  logger.info(`User-Agent: ${userAgent}`);
  next();
};
