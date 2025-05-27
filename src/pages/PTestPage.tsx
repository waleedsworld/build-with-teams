
import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { questions } from "@/components/career/personalityQuestions";

type UserAnswer = {
  questionIndex: number;
  selectedOption: number;
  score: number;
};

const getApplicantType = (score: number) => {
  if (score >= 90) return { type: "Emotionally intelligent human", emoji: "✅" };
  if (score >= 75) return { type: "Likely human, some robotic traits", emoji: "🟡" };
  if (score >= 50) return { type: "Possible AI-assisted or red flag", emoji: "⚠️" };
  return { type: "Likely AI-generated or toxic human", emoji: "🚫" };
};

const PTestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    // If there's a new selection, save it
    if (selectedOption !== null) {
      // Save the answer
      const newAnswer: UserAnswer = {
        questionIndex: currentQuestionIndex,
        selectedOption: selectedOption,
        score: questions[currentQuestionIndex].options[selectedOption].score
      };

      // Update answers
      const updatedAnswers = [...userAnswers];
      // Find if we already have an answer for this question
      const existingAnswerIndex = updatedAnswers.findIndex(a => a.questionIndex === currentQuestionIndex);
      
      if (existingAnswerIndex !== -1) {
        // Replace existing answer
        updatedAnswers[existingAnswerIndex] = newAnswer;
      } else {
        // Add new answer
        updatedAnswers.push(newAnswer);
      }
      
      setUserAnswers(updatedAnswers);
    }

    // Move to next question or complete test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Check if the next question has already been answered
      const nextAnswer = userAnswers.find(a => a.questionIndex === currentQuestionIndex + 1);
      setSelectedOption(nextAnswer ? nextAnswer.selectedOption : null);
    } else {
      setTestCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // Restore the previous answer if it exists
      const prevAnswer = userAnswers.find(a => a.questionIndex === currentQuestionIndex - 1);
      setSelectedOption(prevAnswer ? prevAnswer.selectedOption : null);
    }
  };

  const handleRestartTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setTestCompleted(false);
  };

  const calculateTotalScore = () => {
    return userAnswers.reduce((total, answer) => total + answer.score, 0);
  };

  const totalScore = calculateTotalScore();
  const maxPossibleScore = questions.length * 5;
  const scorePercentage = (totalScore / maxPossibleScore) * 100;
  const applicantResult = getApplicantType(scorePercentage);
  
  // Check if the current question has already been answered
  React.useEffect(() => {
    const existingAnswer = userAnswers.find(a => a.questionIndex === currentQuestionIndex);
    setSelectedOption(existingAnswer ? existingAnswer.selectedOption : null);
  }, [currentQuestionIndex, userAnswers]);

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = testCompleted ? 100 : ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      <div className="container max-w-4xl mx-auto mt-24 px-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Personality Assessment Test</CardTitle>
            <CardDescription>
              {testCompleted 
                ? "Your results are ready!" 
                : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
            </CardDescription>
            <Progress value={progressPercentage} className="mt-2" />
          </CardHeader>

          <CardContent className="pt-4">
            {!testCompleted ? (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{currentQuestion.question}</h3>
                </div>

                <RadioGroup 
                  value={selectedOption?.toString()} 
                  onValueChange={(value) => handleOptionSelect(parseInt(value))}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    {applicantResult.emoji} {applicantResult.type}
                  </h3>
                  <p className="text-xl">Your score: {totalScore} / {maxPossibleScore} ({Math.round(scorePercentage)}%)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Score Breakdown:</h4>
                  <div className="space-y-2">
                    {userAnswers.map((answer, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>Q{answer.questionIndex + 1}: {questions[answer.questionIndex].question.slice(0, 30)}...</span>
                        <span className="font-semibold">{answer.score}/5 points</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Score Interpretation:</h4>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex justify-between">
                      <span>90–100: ✅ Emotionally intelligent human</span>
                    </li>
                    <li className="flex justify-between">
                      <span>75–89: 🟡 Likely human, some robotic traits</span>
                    </li>
                    <li className="flex justify-between">
                      <span>50–74: ⚠️ Possible AI-assisted or red flag</span>
                    </li>
                    <li className="flex justify-between">
                      <span>&lt;50: 🚫 Likely AI-generated or toxic human</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className={`flex ${testCompleted ? "justify-center" : "justify-between"} pt-6`}>
            {!testCompleted ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex === questions.length - 1 ? "Complete Test" : "Next"}
                </Button>
              </>
            ) : (
              <Button onClick={handleRestartTest}>
                Restart Test
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PTestPage;
