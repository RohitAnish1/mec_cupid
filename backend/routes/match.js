import express from "express";
import { supabase } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        // Fetch all approved and unmatched users
        const { data: users, error: fetchError } = await supabase
            .from("registrations")
            .select("*")
            .eq("approved", true)
            .eq("ismatched", false);

        if (fetchError) {
            console.error("🚨 Error fetching registrations:", fetchError);
            return res.status(500).json({
                message: "Error fetching registrations",
                error: fetchError,
            });
        }

        console.log("📌 Fetched Users for Matching:", users);

        const matchedPairs = [];
        const userIds = users.map(user => user.id);

        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                const user1 = users[i];
                const user2 = users[j];

                // Find shared interests
                const sharedInterests = user1.interests.filter(interest =>
                    user2.interests.includes(interest)
                );

                // Match if they have at least 1 shared interest
                if (sharedInterests.length > 0) {
                    matchedPairs.push({
                        user1_id: user1.id,
                        user2_id: user2.id,
                        commonInterests: sharedInterests
                    });
                }
            }
        }

        console.log("✅ Matched Pairs:", matchedPairs);

        // Store matches in the "matches" table
        if (matchedPairs.length > 0) {
            const { error: insertError } = await supabase
                .from("matches")
                .insert(matchedPairs);

            if (insertError) {
                console.error("🚨 Error inserting matches:", insertError);
                return res.status(500).json({
                    message: "Error storing matches",
                    error: insertError
                });
            }

            console.log("✅ Matches inserted successfully:", matchedPairs);
        } else {
            console.log("⚠️ No matches found.");
        }

        // Update `ismatched` column for matched users
        const { error: updateError } = await supabase
            .from("registrations")
            .update({ ismatched: true })
            .in("id", userIds);

        if (updateError) {
            console.error("🚨 Error updating `ismatched` status:", updateError);
            return res.status(500).json({
                message: "Error updating registration status",
                error: updateError,
            });
        }

        console.log("✅ Updated `ismatched` status for:", userIds);
        res.json({ message: "Matching completed successfully!" });

    } catch (error) {
        console.error("🚨 Error during matching:", error);
        res.status(500).json({ message: "Error during matching", error });
    }
});

export default router;
