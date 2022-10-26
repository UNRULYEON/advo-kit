import { FC, SVGProps } from 'react'

const MagnifierIcon: FC<SVGProps<SVGSVGElement>> = ({ ...rest }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_1075_574)">
        <path
          d="M2.18093 2.15655C5.04845 -0.673639 9.71321 -0.754501 12.6817 2.15655C15.3069 4.78459 15.5694 8.82772 13.4895 11.759L19.6688 17.945C20.739 19.0164 18.962 20.7145 17.9321 19.6835L11.773 13.4975C9.24875 15.2765 5.14942 15.6808 2.18093 12.6889C-0.726976 9.79807 -0.726976 5.08782 2.18093 2.17677V2.15655ZM10.9652 10.9706C12.8836 9.05009 12.924 5.87624 10.9652 3.8951C9.00643 1.91397 5.8562 1.97461 3.8974 3.8951C1.9386 5.81559 2.03957 9.09053 3.8974 10.9706C5.75523 12.8506 9.04682 12.8911 10.9652 10.9706Z"
          fill="#0090E3"
        />
      </g>
      <defs>
        <clipPath id="clip0_1075_574">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="matrix(1 0 0 -1 0 20)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default MagnifierIcon
