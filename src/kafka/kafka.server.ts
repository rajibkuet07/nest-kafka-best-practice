import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Admin, Kafka } from 'kafkajs';

import {
  InjectKafkaConfig,
  TOPIC_ONE,
  TOPIC_ONE_PARTITIONS,
  TOPIC_TWO,
  TOPIC_TWO_PARTITIONS,
  kafkaConfig,
} from 'src/common';

@Injectable()
export class KafkaServer implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka: Kafka;
  private readonly admin: Admin;

  constructor(@InjectKafkaConfig() private readonly config: kafkaConfig) {
    // create kafka server
    this.kafka = new Kafka({
      brokers: this.config.brokers,
    });

    // create admin
    this.admin = this.kafka.admin();
  }

  async onModuleInit() {
    // connect admin
    await this.admin.connect();

    // add the topics in the kafka admin
    await this.admin.createTopics({
      topics: [
        { topic: TOPIC_ONE, numPartitions: TOPIC_ONE_PARTITIONS },
        { topic: TOPIC_TWO, numPartitions: TOPIC_TWO_PARTITIONS },
      ],
    });
  }

  async onApplicationShutdown() {
    await this.admin.disconnect();
  }

  public getKafkaServer(): Kafka {
    return this.kafka;
  }
}
