const ormBaseConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE == 'true',
};

const ormSslConfig = {
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const ormFinalConfig =
  process.env.DB_SSL === 'true'
    ? { ...ormBaseConfig, ...ormSslConfig }
    : { ...ormBaseConfig };

module.exports = ormFinalConfig;
