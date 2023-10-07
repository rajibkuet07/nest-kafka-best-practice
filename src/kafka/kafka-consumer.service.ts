import { Injectable, OnApplicationShutdown } from '@nestjs/common';

import { IKafkaConsumer, IKafkaConsumerOptions } from 'src/common';
import { KafkaConsumer } from './kafka.consumer';

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  private readonly consumers: IKafkaConsumer[] = [];

  constructor(private readonly consumer: KafkaConsumer) {}

  async consume({ topics, config, onMessage }: IKafkaConsumerOptions) {
    const consumer = await this.consumer.create(config);
    await consumer.connect();
    await consumer.consume(topics, onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
