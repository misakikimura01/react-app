import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface FormData {
  date: string;
  pv: number;
}

const Graph: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [dataPoints, setDataPoints] = useState<{ date: string, pv: number }[]>([]);

  const onSubmit = (data: FormData) => {
    setDataPoints(prev => [...prev, data]);
    reset(); 
  };

  const chartData = {
    labels: dataPoints.map(point => point.date),
    datasets: [
      {
        label: 'count',
        data: dataPoints.map(point => point.pv),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      }
    ]
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Graph</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="mb-4">
          <label className="block mb-1">日付:</label>
          <input
            type="date"
            {...register('date', { required: '日付を入力してください' })}
            className="border p-2 w-full"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">数値:</label>
          <input
            type="number"
            {...register('pv', {
              required: '数値を入力してください',
              min: { value: 0, message: '数値は0以上である必要があります' }
            })}
            className="border p-2 w-full"
          />
          {errors.pv && <p className="text-red-500">{errors.pv.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">記録</button>
      </form>

      <div className="mt-6">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Graph;
