import { FC, SVGProps } from 'react'

const ArrowIcon: FC<SVGProps<SVGSVGElement>> = ({ ...rest }) => {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M5.02042 10.1533L0.407001 5.53983C-0.904182 4.24079 1.25684 1.9705 2.59231 3.31811L5.99167 6.71747L9.46387 3.31811C10.86 1.92194 12.8025 4.37434 11.6492 5.52769L7.03576 10.1411C6.42873 10.6753 5.54247 10.6753 5.02042 10.1411L5.02042 10.1533Z"
        fill="#BBBBBB"
      />
    </svg>
  )
}

export default ArrowIcon
