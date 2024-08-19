import React from 'react';

interface CardProps {
  title: string;
  value: string;
  percentageChange: string;
  percentageText: string;
  isPositive: boolean;
  icon: JSX.Element;
}

const DashboardCard: React.FC<CardProps> = ({ title, value, percentageChange, percentageText, isPositive, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between w-full h-32 sm:h-40 md:h-44 lg:h-48">
      <div className="flex items-center">
        <div className="bg-gray-200 p-2 rounded-full">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      <div className={`mt-4 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <span>{percentageChange}</span> {percentageText}
      </div>
    </div>
  );
}

export default DashboardCard;
