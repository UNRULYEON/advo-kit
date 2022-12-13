import { FC, SVGProps } from "react";

const ArrowDownIcon: FC<SVGProps<SVGSVGElement>> = ({ ...rest }) => {
  return (
    <svg
      width="12"
      height="9"
      viewBox="0 0 12 9"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M5.02042 7.93237L0.407001 3.31895C-0.904181 2.01991 1.25684 -0.250377 2.59231 1.09723L5.99167 4.49659L9.46387 1.09723C10.86 -0.298939 12.8025 2.15346 11.6492 3.30681L7.03576 7.92023C6.42873 8.45442 5.54247 8.45442 5.02042 7.92023L5.02042 7.93237Z" />
    </svg>
  );
};

export default ArrowDownIcon;
