import * as dotenv from "dotenv";
dotenv.config();

import app from "./index";
import { testConnection } from "./config/database";

const PORT = parseFloat(`${process.env.PORT || 3000}`);

(async () => {
  await testConnection();
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
})();
