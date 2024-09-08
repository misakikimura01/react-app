import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { WiDaySunny, WiCloud, WiRain } from 'react-icons/wi'; // アイコンをインポート

const WeatherContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;

const WeatherHeader = styled.h2`
  background-color: #ff7675;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
`;

const WeatherGrid = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const WeatherCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  width: 100px;
  text-align: center;
`;

const WeatherIcon = styled.div`
  font-size: 2em;
`;

const Temperature = styled.p`
  font-size: 1.2em;
  margin: 5px 0;
`;

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://weather.tsukumijima.net/api/forecast/city/260010`
        );
        setWeatherData(response.data.forecasts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
        alert('天気データの取得に失敗しました。APIキーやリクエストの設定を確認してください。');
      }
    };
    fetchWeather();
  }, []);

  const getWeatherIcon = (telop: string) => {
    if (telop.includes('晴')) {
      return <WiDaySunny />;
    } else if (telop.includes('曇')) {
      return <WiCloud />;
    } else if (telop.includes('雨')) {
      return <WiRain />;
    } else {
      return <WiDaySunny />;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <WeatherContainer>
      <WeatherHeader>週間天気予報</WeatherHeader>
      <WeatherGrid>
        {weatherData.map((weather, index) => (
          <WeatherCard key={index}>
            <h3>{weather.dateLabel}</h3>
            <WeatherIcon>
              {getWeatherIcon(weather.telop)}
            </WeatherIcon>
            <p>{weather.telop}</p>
            <Temperature>{weather.temperature.min.celsius || '-'}℃ / {weather.temperature.max.celsius || '-'}℃</Temperature>
          </WeatherCard>
        ))}
      </WeatherGrid>
    </WeatherContainer>
  );
};

export default WeatherApp;
