import { Injectable } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopics,
  Kafka,
  KafkaMessage,
} from 'kafkajs';

import { IKafkaConsumer, sleep } from 'src/common';
import { KafkaServer } from './kafka.server';

@Injectable()
export class KafkaConsumer implements IKafkaConsumer {
  private readonly kafka: Kafka;
  private consumer: Consumer;

  constructor(private readonly kafkaServer: KafkaServer) {
    this.kafka = this.kafkaServer.getKafkaServer();
  }

  async create(config: ConsumerConfig) {
    // create the consumer
    this.consumer = this.kafka.consumer(config);
    return this;
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      // wait 5 seconds to reconnect
      sleep(5000);

      await this.connect();
    }
  }

  async consume(
    topics: ConsumerSubscribeTopics,
    onMessage: (message: KafkaMessage) => Promise<void>,
  ) {
    await this.consumer.subscribe(topics);
    await this.consumer.run({
      eachMessage: async ({ topic, message, partition }) => {
        console.log(
          `Consuming message ${message.value.toString()} from topic ${topic} in partition ${partition}`,
        );
        await onMessage(message);
      },
    });
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
