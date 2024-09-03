import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { DataSource } from 'typeorm';
const configService = new ConfigService();

export default new DataSource({
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
  migrations: [`${__dirname}/seeds/*{.ts,.js}`],
  migrationsTableName: 'seeds',
  synchronize: false,
});
