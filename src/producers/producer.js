
import kafka from '../../config/kafka.config.js';

const producer = kafka.producer();

export const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('Kafka Producer connected');
  } catch (err) {
    console.error('Error connecting Kafka Producer', err);
  }
};

export const sendMessage = async (topic, message) => {
  try {
    // Ensure producer is connected (you might want to connect earlier in your startup process)
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    console.log(`Message sent to topic "${topic}": ${message}`);
  } catch (error) {
    console.error('Error sending message with Kafka Producer:', error);
  }
};

export default producer;
