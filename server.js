import express from "express"
import { config } from "dotenv"
import mongoose from "mongoose"
import logger from "./middlewares/logger.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import userRouter from "./routes/user.routes.js"

// environment variables config
config()

//=================== Server SetUp ========================
const app = express()
const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log("Server is listening at", PORT, "port")
})

//============= MongoDB Connection SetUp ==================

const MONGO_URI = process.env.MONGO_URI

mongoose
  .connect(MONGO_URI)
  .then((_) => console.log("MongoDB is connected!"))
  .catch((error) => console.error("Connection Error :", error))

//==================== Middlewares ======================
app.use(express.json())
app.use(logger)

//==================== Routers ==========================
app.use("/products", productRouter)
app.use("/cart", cartRouter)
app.use("/user", userRouter)
