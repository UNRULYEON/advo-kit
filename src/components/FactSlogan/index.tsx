import { FC } from "react";

type FactSloganProps = {
  fact: string;
  slogan: string;
};

const FactSlogan: FC<FactSloganProps> = ({ fact, slogan }) => {
  return (
    <div className="flex flex-col">
      <span className="text-dark-blue font-[AvenirBlack] text-[58.1188px] tracking-[-0.025em] mb-[-30px] uppercase after:content-['.'] after:text-hot-orange">
        {fact}
      </span>
      <span className="text-coolblue font-[DobraBook] text-[45.2035px] tracking-[-0.025em] after:content-['.']">
        {slogan}
      </span>
    </div>
  );
};

export default FactSlogan;
