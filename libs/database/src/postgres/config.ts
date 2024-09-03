import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

const configService = new ConfigService();

export const POSTGRES_CONFIGS: DataSourceOptions = {
  port: +configService.getOrThrow<string>('POSTGRES_PORT'),
  logging: true,
  type: 'postgres',
  ssl:
    configService.getOrThrow<string>('DATABASE_SSL') == 'true'
      ? { rejectUnauthorized: false }
      : false,
  host: configService.getOrThrow<string>('POSTGRES_HOST'),
  username: configService.getOrThrow<string>('POSTGRES_USER'),
  password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
  database: configService.getOrThrow<string>('POSTGRES_DATABASE'),
  entities: [`dist/**/*.entity{ .ts,.js}`],
  migrations: [
    `${__dirname}/migrations/*{.ts,.js}`,
    `${__dirname}/seeds/*{.ts,.js}`,
  ],
  migrationsTableName: 'migrations',
  synchronize: false,
};
