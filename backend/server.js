const express = require("express");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const eventRouter = require("./routes/event.routes");
const packageRouter = require("./routes/package.routes");
const serviceRouter = require("./routes/service.routes");
const tagRouter = require("./routes/tag.routes");
const venueRouter = require("./routes/venue.routes");
const bookingRouter = require("./routes/booking.routes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/test-db", async (req, res) => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    res.json({ collections });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/auth", authRouter);
app.use("/event", eventRouter);
app.use("/package", packageRouter);
app.use("/service", serviceRouter);
app.use("/tag", tagRouter);
app.use("/venue", venueRouter);
app.use("/booking", bookingRouter);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
