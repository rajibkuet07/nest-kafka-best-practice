import { Injectable } from '@nestjs/common';
import { Kafka, Message, Producer, ProducerConfig } from 'kafkajs';

import { IKafkaProducer, sleep } from 'src/common';
import { KafkaServer } from './kafka.server';

@Injectable()
export class KafkaProducer implements IKafkaProducer {
  private readonly kafka: Kafka;
  private producer: Producer;

  constructor(private readonly kafkaServer: KafkaServer) {
    this.kafka = this.kafkaServer.getKafkaServer();
  }

  async create(config: ProducerConfig = {}) {
    // create the producer
    this.producer = this.kafka.producer(config);
    return this;
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      // wait 5 seconds to reconnect
      sleep(5000);

      await this.connect();
    }
  }

  async produce(topic: string, messages: Message[]) {
    console.log(
      `Producing messages ${JSON.stringify(messages)} to topic ${topic}`,
    );
    await this.producer.send({ topic, messages });
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
