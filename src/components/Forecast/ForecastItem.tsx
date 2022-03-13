import React from 'react';

interface IForecastItemProps {
  day: string;
  high: number;
  low: number;
  icon: string;
}
const ForecastItem: React.FC<IForecastItemProps> = (props) => {
  return (
    <div>
      <h6>{props.day}</h6>
      <p>{props.icon}</p>
      <span>
        <span>{props.high}</span>
        <sup>&deg;</sup>
        <small>/</small>
        <span>
          {props.low}</span>
        <sup>&deg;</sup>
      </span>
    </div>
  );
};

export default ForecastItem;
