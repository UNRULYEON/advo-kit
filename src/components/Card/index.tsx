import { FC } from 'react';

type CardProps = {
  question: string;
};

const Card: FC<CardProps> = ({ question }) => {
  return (
    <div
      className="font-[Poppins] font-bold text-[20px] leading-[26px] tracking-[-0.02em] bg-white w-[200px] h-[300px] p-4 rounded-lg flex content-end"
      style={{ boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.05)' }}
    >
      {question}
    </div>
  );
};

export default Card;
