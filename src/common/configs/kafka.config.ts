import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const kafkaConfig = registerAs('kafka', () => ({
  brokers: process.env?.KAFKA_BROKERS?.split(',')?.map((item) =>
    item.trim(),
  ) || [`localhost:9092`],
}));

export type kafkaConfig = ConfigType<typeof kafkaConfig>;

export const InjectKafkaConfig = () => Inject(kafkaConfig.KEY);
