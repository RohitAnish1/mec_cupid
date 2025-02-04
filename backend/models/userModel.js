export const userSchema = {
    id: "uuid PRIMARY KEY DEFAULT gen_random_uuid()",
    first_name: "TEXT NOT NULL",
    last_name: "TEXT NOT NULL",
    email: "TEXT UNIQUE NOT NULL",
    interests: "TEXT",
    approved: "BOOLEAN DEFAULT false"
  };
  