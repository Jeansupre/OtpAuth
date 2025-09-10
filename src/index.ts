import { sequelize } from "./infra/db/sequelize";
import logger from "./config/logger";
import { createServer } from "./infra/http/express-server";

const app = createServer(); 

async function bootstrap() {
  try {
    app.on('connect', () => {
      logger.info("✅ Servidor HTTP conectado");
    });

    app.on('connection', () => {
      logger.info("✅ Nueva conexión establecida");
    })

    await sequelize.authenticate();
    logger.info("✅ Conectado a la base de datos");

    app.listen(3000, () => {
      logger.info("🚀 Servidor corriendo en http://localhost:3000");
    });
  } catch (error) {
    logger.error("❌ Error al conectar con la DB:", error);
  }
}

bootstrap();

export default app;
