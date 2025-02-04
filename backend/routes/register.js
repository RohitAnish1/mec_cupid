import express from "express";
import { supabase } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, interests } = req.body;
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  const token = authHeader.split(" ")[1];

  // Verify the token with Supabase
  const { data: user, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user?.user) {
    return res.status(401).json({ error: "User authentication failed" });
  }

  const userId = user.user.id;

  // Insert everything at once
  const { data, error } = await supabase
    .from("registrations")
    .insert([{ user_id: userId, firstName, lastName, interests, approved: false }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Registration submitted successfully", data });
});

export default router;
