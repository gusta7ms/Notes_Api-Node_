require("express-async-error")

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require('./utils/AppError')
const express = require("express")
const routes = require("./routes")
const app = express()
const PORT = 3333

migrationsRun()


app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: error,
    message: "Internal Server Error"
  })
})

app.listen(PORT, () => console.log(`O server está rodando na porta: ${PORT}`))