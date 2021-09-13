import { KafkaOptions, Transport } from '@nestjs/microservices';

export function makeKafkaOptions(): KafkaOptions {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_HOST],
        ssl: process.env.KAFKA_USE_SSL === 'true',
        ...(process.env.KAFKA_SASL_USERNAME &&
          process.env.KAFKA_SASL_USERNAME !== '' &&
          process.env.KAFKA_SASL_PASSWORD &&
          process.env.KAFKA_SASL_PASSWORD !== '' && {
            sasl: {
              mechanism: 'plain',
              username: process.env.KAFKA_SASL_USERNAME,
              password: process.env.KAFKA_SASL_PASSWORD,
            },
          }),
      },
      consumer: {
        groupId:
          !process.env.KAFKA_CONSUMER_GROUP_ID ||
          process.env.KAFKA_CONSUMER_GROUP_ID === ''
            ? 'my-consumer-' + Math.random()
            : process.env.KAFKA_CONSUMER_GROUP_ID,
      },
    },
  };
}
