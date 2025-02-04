export const matchSchema = {
    id: "uuid PRIMARY KEY DEFAULT gen_random_uuid()",
    user1: "uuid REFERENCES users(id) ON DELETE CASCADE",
    user2: "uuid REFERENCES users(id) ON DELETE CASCADE"
  };
  