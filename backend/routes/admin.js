import express from "express";
import { supabase } from "../db.js";
const router = express.Router();

router.get("/pending", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("registrations")
            .select("*")
            .eq("approved", false); // Changed "Approved" to "approved"
        if (error) {
            console.error("Error fetching pending approvals:", error);
            return res.status(500).json({
                message: "Failed to fetch pending approvals",
                error,
            });
        }
        res.json(data);
    } catch (err) {
        console.error("Error fetching data", err);
        res.status(500).json({ message: "Failed to fetch data", error: err });
    }
});

router.put("/approve/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("registrations")
            .update({ approved: true }) // Changed "Approved" to "approved"
            .eq("id", id);

        if (error) {
            console.error("Error approving registration:", error);
            return res
                .status(500)
                .json({ message: "Failed to approve registration", error });
        }
        res.json({ message: "Registration approved successfully", data });
    } catch (error) {
        console.error("Error during approval:", error);
        res
            .status(500)
            .json({ message: "Error during approval", error });
    }
});

export default router;