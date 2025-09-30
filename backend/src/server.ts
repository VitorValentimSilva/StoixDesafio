import app from "./app";
import { swaggerDocs } from "./config/swagger";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor em execução http://localhost:${PORT}`);
  swaggerDocs(app, PORT);
});
