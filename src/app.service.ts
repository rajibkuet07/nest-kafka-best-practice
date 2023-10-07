import { Injectable } from '@nestjs/common';

import { KafkaProducerService } from './kafka/kafka-producer.service';
import { TOPIC_ONE, TOPIC_TWO } from './common';

@Injectable()
export class AppService {
  constructor(private readonly producer: KafkaProducerService) {}

  async getHello() {
    await this.producer.produce({
      topic: TOPIC_ONE,
      messages: [{ value: `Hello KafkaJS ${TOPIC_ONE}!`, partition: 1 }],
    });

    return 'TOPIC_ONE Producer called';
  }

  async getHelloTwo() {
    await this.producer.produce({
      topic: TOPIC_TWO,
      messages: [{ value: `Hello KafkaJS ${TOPIC_TWO}!` }],
    });

    return 'TOPIC_TWO Producer called';
  }
}
