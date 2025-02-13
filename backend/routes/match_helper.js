// Question weights for scoring (total = 100)
const QUESTION_WEIGHTS = {
  0: 10, // Personality type
  1: 8, // Ideal date
  2: 12, // Love language
  3: 6, // Communication preference
  4: 4, // Love at first sight
  5: 8, // Lifestyle/Sunday preference
  6: 6, // Entertainment preference
  7: 4, // Approach to romance
  8: 15, // Partner preferences
  9: 15, // Relationship goals
  10: 12, // Conflict resolution
};

// Special compatibility matrices
const PERSONALITY_COMPATIBILITY = {
  A: { A: 1.0, B: 0.3, C: 0.7 }, // Introvert
  B: { A: 0.3, B: 1.0, C: 0.7 }, // Extrovert
  C: { A: 0.7, B: 0.7, C: 1.0 }, // Ambivert
};

const LOVE_LANGUAGE_COMPATIBILITY = {
  A: { A: 1.0, B: 0.5, C: 0.7, D: 0.6, E: 0.5 },
  B: { A: 0.5, B: 1.0, C: 0.6, D: 0.5, E: 0.4 },
  C: { A: 0.7, B: 0.6, C: 1.0, D: 0.7, E: 0.6 },
  D: { A: 0.6, B: 0.5, C: 0.7, D: 1.0, E: 0.8 },
  E: { A: 0.5, B: 0.4, C: 0.6, D: 0.8, E: 1.0 },
};

// Check if two users match basic preferences
const checkPreferenceMatch = (user1, user2) => {
  // Check gender preferences
  const genderMatch =
    user1.gender_preference === user2.gender &&
    user2.gender_preference === user1.gender;

  if (!genderMatch) return false;

  // Check age preferences
  const age1 = user1.age;
  const age2 = user2.age;

  if (user1.age_preference === "elder" && age2 <= age1) return false;
  if (user1.age_preference === "younger" && age2 >= age1) return false;
  if (user2.age_preference === "elder" && age1 <= age2) return false;
  if (user2.age_preference === "younger" && age1 >= age2) return false;

  return true;
};

// Calculate compatibility score for a specific question
const calculateQuestionScore = (questionIndex, answer1, answer2) => {
  // Personality type compatibility (Question 0)
  if (questionIndex === 0) {
    return PERSONALITY_COMPATIBILITY[answer1]?.[answer2] || 0;
  }

  // Love language compatibility (Question 2)
  if (questionIndex === 2) {
    return LOVE_LANGUAGE_COMPATIBILITY[answer1]?.[answer2] || 0;
  }

  // Relationship goals (Question 9)
  if (questionIndex === 9) {
    if (answer1 === answer2) return 1.0;
    if (
      (answer1 === "A" && answer2 === "B") ||
      (answer1 === "B" && answer2 === "A")
    )
      return 0.2;
    if (answer1 === "C" || answer2 === "C") return 0.6;
    return 0.3;
  }

  // Conflict resolution (Question 10)
  if (questionIndex === 10) {
    if (answer1 === answer2) return 1.0;
    if (
      (answer1 === "A" && answer2 === "C") ||
      (answer1 === "C" && answer2 === "A")
    )
      return 0.8;
    return 0.5;
  }

  // Default scoring for other questions
  return answer1 === answer2 ? 1.0 : 0.5;
};

// Calculate overall compatibility score between two users
const calculateCompatibilityScore = (user1, user2) => {
  let totalScore = 0;
  let totalWeight = 0;

  user1.interests.forEach((answer1, index) => {
    const answer2 = user2.interests[index];
    const weight = QUESTION_WEIGHTS[index];
    const score = calculateQuestionScore(index, answer1, answer2);

    totalScore += weight * score;
    totalWeight += weight;
  });

  return (totalScore / totalWeight) * 100;
};

// Main matching function
const findMatches = (users) => {
  const eligibleUsers = users.filter(
    (user) => user.approved && !user.ismatched
  );
  const matchedUsers = new Set();
  const finalMatches = [];

  // Early return if no eligible users
  if (eligibleUsers.length === 0) {
    return { matchedPairs: [], userIds: matchedUsers };
  }

  const compatibilityMatrix = {};

  // Initialize matrix for each user
  eligibleUsers.forEach((user) => {
    compatibilityMatrix[user.id] = {};
  });

  // Calculate scores for all possible pairs
  for (let i = 0; i < eligibleUsers.length; i++) {
    for (let j = 0; j < eligibleUsers.length; j++) {
      if (i !== j) {
        const user1 = eligibleUsers[i];
        const user2 = eligibleUsers[j];

        if (checkPreferenceMatch(user1, user2)) {
          const score = calculateCompatibilityScore(user1, user2);
          compatibilityMatrix[user1.id][user2.id] = score;
        } else {
          compatibilityMatrix[user1.id][user2.id] = -1; // Invalid match
        }
      }
    }
  }

  // Function to find best match for a user among unmatched users
  const findBestMatch = (userId) => {
    const userScores = compatibilityMatrix[userId];
    let bestScore = -1;
    let bestMatchId = null;

    Object.entries(userScores).forEach(([potentialMatchId, score]) => {
      // Only consider valid matches (score > 0)
      if (!matchedUsers.has(potentialMatchId) && score > bestScore && score > 0) {
        bestScore = score;
        bestMatchId = potentialMatchId;
      }
    });

    return { bestMatchId, bestScore };
  };

  // Find mutual best matches
  while (matchedUsers.size < eligibleUsers.length) {
    let bestMutualMatch = null;
    let highestMutualScore = -1;

    // Check each unmatched user
    for (const user1 of eligibleUsers) {
      if (!matchedUsers.has(user1.id)) {
        // Find user1's best match
        const { bestMatchId: user2Id, bestScore: score1 } = findBestMatch(
          user1.id
        );

        if (user2Id) {
          // Check if user1 is also the best match for user2
          const { bestMatchId: mutualCheckId } = findBestMatch(user2Id);

          if (mutualCheckId === user1.id && score1 > highestMutualScore) {
            bestMutualMatch = {
              pair: [user1, eligibleUsers.find((u) => u.id === user2Id)],
              score: score1,
              details: {
                user1: `${user1.firstName} ${user1.lastName}`,
                user2: `${
                  eligibleUsers.find((u) => u.id === user2Id).firstName
                } ${eligibleUsers.find((u) => u.id === user2Id).lastName}`,
                score: score1.toFixed(2),
              },
            };
            highestMutualScore = score1;
          }
        }
      }
    }

    // If we found a mutual best match, add it to final matches
    if (bestMutualMatch) {
      finalMatches.push({
        user1_id: bestMutualMatch.pair[0].id,
        user2_id: bestMutualMatch.pair[1].id,
      });
      matchedUsers.add(bestMutualMatch.pair[0].id);
      matchedUsers.add(bestMutualMatch.pair[1].id);
    } else {
      // If no mutual best match found, break to avoid infinite loop
      // This could happen with last unpaired user
      break;
    }
  }

  // Second pass: Match remaining users based only on basic preferences
  const remainingUsers = eligibleUsers.filter(user => !matchedUsers.has(user.id));
  
  for (let i = 0; i < remainingUsers.length; i++) {
    const user1 = remainingUsers[i];
    if (matchedUsers.has(user1.id)) continue;

    for (let j = i + 1; j < remainingUsers.length; j++) {
      const user2 = remainingUsers[j];
      if (matchedUsers.has(user2.id)) continue;

      if (checkPreferenceMatch(user1, user2)) {
        finalMatches.push({
          user1_id: user1.id,
          user2_id: user2.id,
        });
        matchedUsers.add(user1.id);
        matchedUsers.add(user2.id);
        break;
      }
    }
  }

  return { matchedPairs: finalMatches, userIds: matchedUsers };
};

export default findMatches;
