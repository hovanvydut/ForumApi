export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    sync: process.env.DB_TYPEORM_SYNC === 'true' ? true : false,
  },
  bcrypt: {
    saltRound: process.env.SALT_ROUNDS || 10,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY || 'hovanvydut@gmail.com',
    expires: process.env.JWT_EXPIRATION_TIME || '5184000s',
  },
});
