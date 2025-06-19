
import kafka from '../../config/kafka.config.js';

const consumerGroupId = process.env.KAFKA_GROUP_ID || 'express-microservice-group';
const consumer = kafka.consumer({ groupId: consumerGroupId });

export const runConsumer = async (topic) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    console.log(`Kafka Consumer connected and subscribed to topic: ${topic}`);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
        // Add your message processing logic here.
      },
    });
  } catch (error) {
    console.error('Error running Kafka Consumer:', error);
  }
};

export default consumer;
