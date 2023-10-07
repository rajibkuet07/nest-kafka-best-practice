import {
  ConsumerConfig,
  ConsumerSubscribeTopics,
  KafkaMessage,
  Message,
  ProducerConfig,
} from 'kafkajs';

export interface IKafkaProducer {
  create: (config?: ProducerConfig) => Promise<this>;
  connect: () => Promise<void>;
  produce: (topic: string, message: Message[]) => Promise<void>;
  disconnect: () => Promise<void>;
}

export interface IKafkaConsumer {
  create: (connect: ConsumerConfig) => Promise<this>;
  connect: () => Promise<void>;
  consume: (
    topics: ConsumerSubscribeTopics,
    onMessage: (message: KafkaMessage) => Promise<void>,
  ) => Promise<void>;
  disconnect: () => Promise<void>;
}

export interface IKafkaProducerOptions {
  topic: string;
  config?: ProducerConfig;
  messages: Message[];
}

export interface IKafkaConsumerOptions {
  topics: ConsumerSubscribeTopics;
  config: ConsumerConfig;
  onMessage: (message: KafkaMessage) => Promise<void>;
}
