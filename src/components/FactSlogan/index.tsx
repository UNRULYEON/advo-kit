import { FC } from "react";

type FactSloganProps = {
  fact: string;
  slogan: string;
};

const FactSlogan: FC<FactSloganProps> = ({ fact, slogan }) => {
  return (
    <div className="flex flex-col columns-1">
      <span className="text-dark-blue font-[AvenirBlack] text-[40px] md:text-[45px] lg:text-[58.1188px] tracking-[-0.025em] mb-[-20px] lg:mb-[-30px] uppercase after:content-['.'] after:text-hot-orange">
        {fact}
      </span>
      <span className="text-coolblue font-[DobraBook] text-[31px] md:text-[35px] lg:text-[45.2035px] tracking-[-0.025em] after:content-['.']">
        {slogan}
      </span>
    </div>
  );
};

export default FactSlogan;

// 58 | 100%
// 45 | 77.5%

// 45 | 100%
// 35 | 77.5%

// 40 | 100%
// 31 | 77.5%
