import { BattingAction, BowlingAction, ActionResult } from '../types/game';

// Commentary templates for different game scenarios
const COMMENTARY = {
  DOT_BALL: [
    "Dot ball! Good defensive play.",
    "No run. Solid defense by the batsman.",
    "Well bowled! No run from that delivery.",
    "The batsman blocks it safely. No run.",
    "That's a dot ball. Good bowling."
  ],
  SINGLE: [
    "Quick single taken! Good running between the wickets.",
    "The batsman pushes it into the gap for a single.",
    "Just a single from that delivery.",
    "They're quick between the wickets! One run added.",
    "A comfortable single taken by the batsman."
  ],
  DOUBLE: [
    "Two runs! Good running by the batsmen.",
    "The batsman finds the gap and takes two runs.",
    "Quick running between the wickets for a double.",
    "That's well played for two runs.",
    "The batsmen scamper back for a second run!"
  ],
  TRIPLE: [
    "Three runs! Excellent running between the wickets.",
    "They're pushing hard and get three runs!",
    "Good placement and running for three.",
    "The batsmen are quick and take three runs.",
    "Three runs added to the total. Great running."
  ],
  FOUR: [
    "FOUR! Beautifully played through the covers.",
    "That's racing away to the boundary! FOUR runs.",
    "FOUR runs! The fielder had no chance there.",
    "Brilliant shot! That's gone for FOUR.",
    "The batsman finds the gap and gets a boundary. FOUR runs!"
  ],
  SIX: [
    "SIX! That's a massive hit over the bowler's head!",
    "The batsman has smashed that out of the ground! SIX runs!",
    "What a shot! That's sailed over the boundary for SIX.",
    "Magnificent! The batsman clears the ropes with ease. SIX!",
    "SIX runs! The crowd goes wild for that one!"
  ],
  WICKET: [
    "OUT! The batsman is caught in the deep.",
    "WICKET! That's clean bowled! The stumps are shattered.",
    "The batsman is OUT! LBW, the finger goes up!",
    "WICKET! Excellent catch by the fielder.",
    "That's the end of the batsman! OUT! Good bowling."
  ]
};

// Get a random commentary line based on the type of action
function getRandomCommentary(type: keyof typeof COMMENTARY): string {
  const options = COMMENTARY[type];
  return options[Math.floor(Math.random() * options.length)];
}

// Calculate probability of different outcomes based on batting and bowling actions
export function getActionResult(
  battingAction: BattingAction, 
  bowlingAction: BowlingAction
): ActionResult {
  // Base probabilities for each batting style
  const baseProbabilities = {
    [BattingAction.DEFENSIVE]: { 
      dot: 0.50, single: 0.30, double: 0.15, triple: 0.03, four: 0.01, six: 0.00, wicket: 0.01 
    },
    [BattingAction.BALANCED]: { 
      dot: 0.30, single: 0.35, double: 0.15, triple: 0.05, four: 0.10, six: 0.02, wicket: 0.03 
    },
    [BattingAction.AGGRESSIVE]: { 
      dot: 0.20, single: 0.15, double: 0.10, triple: 0.05, four: 0.20, six: 0.15, wicket: 0.15 
    }
  };

  // Adjust probabilities based on bowling style
  let adjustedProbabilities = { ...baseProbabilities[battingAction] };
  
  if (bowlingAction === BowlingAction.SPIN) {
    // Spin bowling increases chances of singles but reduces boundaries
    adjustedProbabilities.single += 0.05;
    adjustedProbabilities.four -= 0.02;
    adjustedProbabilities.six -= 0.02;
    // Aggressive batting against spin is risky
    if (battingAction === BattingAction.AGGRESSIVE) {
      adjustedProbabilities.wicket += 0.05;
    }
  } else if (bowlingAction === BowlingAction.FAST) {
    // Fast bowling increases chance of wicket and boundaries
    adjustedProbabilities.wicket += 0.05;
    adjustedProbabilities.four += 0.02;
    // Defensive batting against fast is safer
    if (battingAction === BattingAction.DEFENSIVE) {
      adjustedProbabilities.wicket -= 0.02;
    }
  }

  // Normalize probabilities to ensure they sum to 1
  const total = Object.values(adjustedProbabilities).reduce((sum, val) => sum + val, 0);
  Object.keys(adjustedProbabilities).forEach(key => {
    adjustedProbabilities[key as keyof typeof adjustedProbabilities] /= total;
  });

  // Determine the outcome based on adjusted probabilities
  const random = Math.random();
  let cumulativeProbability = 0;
  let outcome: keyof typeof COMMENTARY = 'DOT_BALL';

  if ((cumulativeProbability += adjustedProbabilities.dot) > random) {
    outcome = 'DOT_BALL';
    return { runs: 0, isWicket: false, commentary: getRandomCommentary(outcome) };
  } else if ((cumulativeProbability += adjustedProbabilities.single) > random) {
    outcome = 'SINGLE';
    return { runs: 1, isWicket: false, commentary: getRandomCommentary(outcome) };
  } else if ((cumulativeProbability += adjustedProbabilities.double) > random) {
    outcome = 'DOUBLE';
    return { runs: 2, isWicket: false, commentary: getRandomCommentary(outcome) };
  } else if ((cumulativeProbability += adjustedProbabilities.triple) > random) {
    outcome = 'TRIPLE';
    return { runs: 3, isWicket: false, commentary: getRandomCommentary(outcome) };
  } else if ((cumulativeProbability += adjustedProbabilities.four) > random) {
    outcome = 'FOUR';
    return { runs: 4, isWicket: false, commentary: getRandomCommentary(outcome) };
  } else if ((cumulativeProbability += adjustedProbabilities.six) > random) {
    outcome = 'SIX';
    return { runs: 6, isWicket: false, commentary: getRandomCommentary(outcome) };
  } else {
    outcome = 'WICKET';
    return { runs: 0, isWicket: true, commentary: getRandomCommentary(outcome) };
  }
}

// Format overs (convert balls to overs.balls format)
export function formatOvers(balls: number): string {
  const overs = Math.floor(balls / 6);
  const remainingBalls = balls % 6;
  return `${overs}.${remainingBalls}`;
}

// Calculate current run rate
export function calculateRunRate(runs: number, balls: number): string {
  if (balls === 0) return '0.00';
  return ((runs / balls) * 6).toFixed(2);
}

// Calculate required run rate
export function calculateRequiredRunRate(
  target: number | null, 
  currentRuns: number, 
  ballsRemaining: number
): string {
  if (!target || ballsRemaining === 0) return '0.00';
  const runsRequired = target - currentRuns + 1;
  return ((runsRequired / ballsRemaining) * 6).toFixed(2);
}

// Get balls remaining in the innings
export function getBallsRemaining(maxOvers: number, ballsPlayed: number): number {
  return Math.max(0, maxOvers * 6 - ballsPlayed);
}

// Check if the current team is batting
export function isBatting(currentInnings: 1 | 2, teamNumber: 1 | 2): boolean {
  return currentInnings === teamNumber;
}