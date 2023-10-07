import { Module } from '@nestjs/common';

import { KafkaServer } from './kafka.server';
import { KafkaProducer } from './kafka.producer';
import { KafkaConsumer } from './kafka.consumer';
import { KafkaProducerService } from './kafka-producer.service';
import { KafkaConsumerService } from './kafka-consumer.service';

@Module({
  providers: [
    KafkaServer,
    KafkaProducer,
    KafkaConsumer,
    KafkaProducerService,
    KafkaConsumerService,
  ],
  exports: [
    KafkaServer,
    KafkaProducer,
    KafkaConsumer,
    KafkaProducerService,
    KafkaConsumerService,
  ],
})
export class KafkaModule {}
