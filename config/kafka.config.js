// src/kafka/config.js
import { Kafka } from 'kafkajs';
import { env } from './env.js'; // Ensure environment variables are loaded

const clientId = env.KAFKA_CLIENT_ID || 'express-microservice';
const brokers = env.KAFKA_BROKERS ? env.KAFKA_BROKERS.split(',') : ['localhost:9092'];
const groupId = env.KAFKA_GROUP_ID || 'express-microservice-group';

const kafka = new Kafka({
  clientId,
  brokers,
});

export default kafka;
// Optionally, you can also export helper functions if needed.
