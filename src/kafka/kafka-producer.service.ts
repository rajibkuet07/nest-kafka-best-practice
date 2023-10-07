import { Injectable, OnApplicationShutdown } from '@nestjs/common';

import { IKafkaProducer, IKafkaProducerOptions } from 'src/common';
import { KafkaProducer } from './kafka.producer';
import { ProducerConfig } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IKafkaProducer>();

  constructor(private readonly producer: KafkaProducer) {}

  async produce({ topic, config, messages }: IKafkaProducerOptions) {
    const producer = await this.getOrCreateProducer(topic, config ?? {});
    await producer.produce(topic, messages);
  }

  async onApplicationShutdown() {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }

  private async getOrCreateProducer(topic: string, config: ProducerConfig) {
    // check if the producer exists in the producers map
    let producer = this.producers.get(topic);

    // otherwise create and set to the map
    if (!producer) {
      producer = await this.producer.create(config);
      await producer.connect();
      this.producers.set(topic, producer);
    }

    return producer;
  }
}
