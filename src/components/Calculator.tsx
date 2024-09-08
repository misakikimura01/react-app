// これ以降理解はまだ
// 電卓
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';

const CalculatorContainer = styled.div`
  background-color: #2e2e2e;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  margin: 0 auto;
`;

const Display = styled.div`
  background-color: #333;
  color: white;
  font-size: 2em;
  padding: 10px;
  text-align: right;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Button = styled.button`
  background-color: #444;
  color: white;
  font-size: 1.5em;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
  &:active {
    background-color: #666;
  }
`;

const ClearButton = styled(Button)`
  grid-column: span 4;
  background-color: #e74c3c;
  &:hover {
    background-color: #c0392b;
  }
  &:active {
    background-color: #a93226;
  }
`;

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleClear = () => {
    setInput('');
    setResult('');
    setError('');
  };

  const handleInput = (value: string) => {
    setError('');
    setInput(prev => prev + value);
  };

  const handleCalculate = () => {
    try {
      const evalResult = eval(input);
      setResult(evalResult);
    } catch (e) {
      setError('計算エラー');
    }
  };

  return (
    <CalculatorContainer>
      <Display>{result || input || '0'}</Display>
      <ButtonGrid>
        <Button onClick={() => handleInput('7')}>7</Button>
        <Button onClick={() => handleInput('8')}>8</Button>
        <Button onClick={() => handleInput('9')}>9</Button>
        <Button onClick={() => handleInput('+')}>+</Button>
        <Button onClick={() => handleInput('4')}>4</Button>
        <Button onClick={() => handleInput('5')}>5</Button>
        <Button onClick={() => handleInput('6')}>6</Button>
        <Button onClick={() => handleInput('-')}>-</Button>
        <Button onClick={() => handleInput('1')}>1</Button>
        <Button onClick={() => handleInput('2')}>2</Button>
        <Button onClick={() => handleInput('3')}>3</Button>
        <Button onClick={() => handleInput('*')}>*</Button>
        <Button onClick={() => handleInput('0')}>0</Button>
        <Button onClick={() => handleInput('/')}>/</Button>
        <Button onClick={() => handleInput('.')}>.</Button>
        <Button onClick={handleCalculate}>=</Button>
        <ClearButton onClick={handleClear}>Clear</ClearButton>
      </ButtonGrid>
    </CalculatorContainer>
  );
};

export default Calculator;
