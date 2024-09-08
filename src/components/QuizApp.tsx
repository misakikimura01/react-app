import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Question = styled.h2`
  margin-bottom: 20px;
`;

const Timer = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
  color: #ff7675;
`;

const AnswerInput = styled.input`
  padding: 10px;
  font-size: 1em;
  margin-bottom: 20px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const Result = styled.div`
  margin-top: 20px;
  font-size: 1.2em;
`;

const QuizApp: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answerTime, setAnswerTime] = useState<number | null>(null);

  const correctAnswer = 'A';

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const normalizeAnswer = (answer: string) => {
    return answer.trim().toLowerCase().replace(/[ぁ-ん]/g, match =>
      String.fromCharCode(match.charCodeAt(0) - 0x60)
    );
  };

  const handleSubmit = () => {
    const normalizedAnswer = normalizeAnswer(answer);
    const normalizedCorrectAnswer = normalizeAnswer(correctAnswer);
    setIsCorrect(normalizedAnswer === normalizedCorrectAnswer);
    setSubmitted(true);
    setAnswerTime(10 - timeLeft);
  };

  return (
    <QuizContainer>
      <Question>このクイズの答えは何でしょう？ (例: A)</Question>
      <Timer>残り時間: {timeLeft}秒</Timer>
      <AnswerInput
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={submitted}
      />
      <Button onClick={handleSubmit} disabled={submitted}>
        解答する
      </Button>
      {submitted && (
        <Result>
          {isCorrect ? '正解です！' : '不正解です！'}<br />
          解答時間: {answerTime}秒<br />
          あなたの答え: {answer}
        </Result>
      )}
    </QuizContainer>
  );
};

export default QuizApp;
