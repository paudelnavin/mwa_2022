const express = require("express");
const router = express.Router();
const hikingRouter = require("../hikings/routes/hikings.routes");
const userRouter = require("../users/routes/users.routes");

router.use("/hikings",hikingRouter);
router.use("/users", userRouter);

module.exports=router;