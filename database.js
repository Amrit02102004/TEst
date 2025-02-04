import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL for secure connection
      rejectUnauthorized: false, // Skip SSL certificate verification (Supabase-specific)
    },
  },
  logging: false //ill set it to false later
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection has been established successfully.");

    // Sync models with the database
    await sequelize.sync({ force: false });  // Set force: true to drop and recreate tables

    console.log("Models synchronized with the database.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelize;