import databaseConfig from "./models/index.js";

import app from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  databaseConfig.connectDB();

  console.log(`Server is up and running on ${port}`);
});
