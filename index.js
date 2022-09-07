//requires
const express = require("express");
const corsMiddleWare = require("cors");

//routers
const locationsRouter = require("./routers/locations");

//create an express app
const app = express();

//create port variable
const port = 4000;

app.use(corsMiddleWare());
app.use(express.json());

//routes
app.use("/locations", locationsRouter);

//start app
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
