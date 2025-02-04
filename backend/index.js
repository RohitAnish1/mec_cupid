import express from "express";
import cors from "cors";
import registerRoutes from "./routes/register.js";
import adminRoutes from "./routes/admin.js";
import matchRoutes from "./routes/match.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/register", registerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/match", matchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
