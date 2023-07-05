import app from "./src/app";
import { PORT } from "./src/config";
import { connection } from "./src/config/db";

connection();

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

export default app;
