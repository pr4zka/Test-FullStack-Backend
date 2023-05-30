const express = require('express')
const morgan = require('morgan')
const app = express()
const apiRouter = express.Router();


app.use(morgan("dev"));
app.use(express.json());
app.use("/api", apiRouter);








app.listen(3000, () => console.log('Server ready'))