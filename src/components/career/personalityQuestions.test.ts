import { describe, it, expect } from "vitest";
import {
  questions,
  calculateTotalScore,
  getMaxPossibleScore,
  calculateScorePercentage,
  getPersonalityType,
  generatePersonalityReport,
} from "./personalityQuestions";

// A helper that builds an answer set choosing a fixed option index for
// every question, mirroring how PTestPage records answers.
const buildAnswers = (optionIndex: number) =>
  questions.map((q, questionIndex) => ({
    questionIndex,
    selectedOption: optionIndex,
    score: q.options[optionIndex]?.score ?? 0,
  }));

describe("personality question bank", () => {
  it("exposes a non-empty question list", () => {
    expect(questions.length).toBeGreaterThan(0);
  });

  it("gives every question at least two options, each with a numeric score", () => {
    for (const q of questions) {
      expect(q.question).toBeTruthy();
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      for (const opt of q.options) {
        expect(typeof opt.text).toBe("string");
        expect(opt.text.length).toBeGreaterThan(0);
        expect(typeof opt.score).toBe("number");
        expect(opt.score).toBeGreaterThanOrEqual(0);
        expect(opt.score).toBeLessThanOrEqual(5);
      }
    }
  });
});

describe("scoring helpers", () => {
  it("sums the score field of each answer", () => {
    const answers = [
      { questionIndex: 0, selectedOption: 0, score: 3 },
      { questionIndex: 1, selectedOption: 2, score: 5 },
      { questionIndex: 2, selectedOption: 1, score: 2 },
    ];
    expect(calculateTotalScore(answers)).toBe(10);
  });

  it("returns 0 for an empty answer set", () => {
    expect(calculateTotalScore([])).toBe(0);
  });

  it("computes max score as questions.length * 5", () => {
    expect(getMaxPossibleScore()).toBe(questions.length * 5);
  });

  it("expresses the score as a percentage of the max", () => {
    const max = getMaxPossibleScore();
    expect(calculateScorePercentage(max)).toBe(100);
    expect(calculateScorePercentage(0)).toBe(0);
    expect(calculateScorePercentage(max / 2)).toBeCloseTo(50);
  });
});

describe("getPersonalityType thresholds", () => {
  it("classifies a perfect score as emotionally intelligent", () => {
    expect(getPersonalityType(100)).toEqual({
      type: "Emotionally intelligent human",
      emoji: "✅",
    });
  });

  it("classifies the 75-89 band as likely human with robotic traits", () => {
    expect(getPersonalityType(80).type).toBe("Likely human, some robotic traits");
  });

  it("classifies the 50-74 band as a possible red flag", () => {
    expect(getPersonalityType(60).type).toBe("Possible AI-assisted or red flag");
  });

  it("classifies below 50 as likely AI/toxic", () => {
    expect(getPersonalityType(10).type).toBe("Likely AI-generated or toxic human");
  });

  it("uses inclusive lower bounds at each boundary", () => {
    expect(getPersonalityType(90).emoji).toBe("✅");
    expect(getPersonalityType(75).emoji).toBe("🟡");
    expect(getPersonalityType(50).emoji).toBe("⚠️");
    expect(getPersonalityType(49.9).emoji).toBe("🚫");
  });
});

describe("generatePersonalityReport", () => {
  it("produces a full report for a max-score run", () => {
    // Pick, per question, the option with the highest score.
    const answers = questions.map((q, questionIndex) => {
      let best = 0;
      q.options.forEach((o, i) => {
        if (o.score > q.options[best].score) best = i;
      });
      return { questionIndex, selectedOption: best, score: q.options[best].score };
    });

    const report = generatePersonalityReport(answers);
    expect(report.maxScore).toBe(questions.length * 5);
    expect(report.totalScore).toBe(calculateTotalScore(answers));
    expect(report.scorePercentage).toBe(
      Math.round((report.totalScore / report.maxScore) * 100),
    );
    expect(report.personalityType).toBeTruthy();
    expect(report.personalityEmoji).toBeTruthy();
    expect(report.detailedAnswers).toHaveLength(questions.length);
  });

  it("maps each detailed answer back to its question text and chosen option", () => {
    const answers = buildAnswers(0);
    const report = generatePersonalityReport(answers);
    report.detailedAnswers.forEach((entry, i) => {
      expect(entry.question).toBe(questions[i].question);
      expect(entry.answer).toBe(questions[i].options[0].text);
      expect(entry.score).toBe(questions[i].options[0].score);
    });
  });

  it("rounds the score percentage to an integer", () => {
    const report = generatePersonalityReport(buildAnswers(0));
    expect(Number.isInteger(report.scorePercentage)).toBe(true);
  });
});
