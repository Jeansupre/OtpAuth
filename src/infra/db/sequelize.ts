import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user";
import logger from "../../config/logger";


export const sequelize = new Sequelize( 
  "otp_data",
  "postgres",
  "",
  { 
    host: "localhost",
    dialect: "postgres",
    models: [User],
    logging: (sql) => {
      if (!sql.includes("1+1"))
      logger.info(sql);
    } 
  }
);