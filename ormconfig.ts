import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

export const dataSourceOption = {
  type: process.env.DB_TYPE || 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/database/migrations/**/*{.js,.ts}'],
  cli: {
    migrationsDir: 'database/migrations',
  },
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOption);

export default dataSource;
