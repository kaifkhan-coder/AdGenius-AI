
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Monday', reach: 450, engagement: 24 },
  { name: 'Tuesday', reach: 890, engagement: 56 },
  { name: 'Wednesday', reach: 1200, engagement: 98 },
  { name: 'Thursday', reach: 1100, engagement: 84 },
  { name: 'Friday', reach: 1500, engagement: 120 },
  { name: 'Saturday', reach: 1800, engagement: 156 },
  { name: 'Sunday', reach: 1400, engagement: 112 },
];

const PerformanceChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Predicted Reach</h3>
          <p className="text-sm text-slate-500">Estimated weekly impressions for this ad campaign</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-indigo-600">8.2k</p>
          <p className="text-[10px] font-bold text-green-500 uppercase">+12% vs Avg</p>
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10 }}
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="reach" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 5 ? '#4f46e5' : '#cbd5e1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
