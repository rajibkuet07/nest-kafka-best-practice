import { Injectable, OnModuleInit } from '@nestjs/common';

import { KafkaConsumerService } from './kafka/kafka-consumer.service';
import { TOPIC_ONE, TOPIC_TWO } from './common';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumer: KafkaConsumerService) {}

  async onModuleInit() {
    await this.consumer.consume({
      topics: { topics: [TOPIC_ONE, TOPIC_TWO] },
      config: { groupId: 'test-group' },
      onMessage: async (message) => {
        console.log(`The consumed message is ${message.value.toString()}`);
      },
    });
  }
}
