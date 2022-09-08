//requires
const express = require("express");
const corsMiddleWare = require("cors");
const port = require("./config/constants").PORT;

//routers
const authRouter = require("./routers/auth");
const locationsRouter = require("./routers/locations");

//middleware
const authMiddleWare = require("./auth/middleware");

//create an express app
const app = express();

app.use(corsMiddleWare());
app.use(express.json());

//routes
app.use("/auth", authRouter);
app.use("/locations", locationsRouter);

//start app
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
