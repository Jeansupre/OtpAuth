import { sequelize } from "./infra/db/sequelize";
import logger from "./config/logger";
import { createServer } from "./infra/http/express-server";

const app = createServer(); 

async function bootstrap() {
  try {
    app.on('connect', () => {
      logger.info("✅ HTTP Server connected");
    });

    app.on('connection', () => {
      logger.info("✅ New connection established");
    })

    await sequelize.authenticate();
    logger.info("✅ Connected to the database");

    app.listen(3000, () => {
      logger.info("🚀 Server running at http://localhost:3000");
    });
  } catch (error) {
    logger.error("❌ Error connecting to the database:", error);
  }
}

bootstrap();

export default app;
