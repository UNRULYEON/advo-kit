import { FC } from 'react'
import styled from 'styled-components'

const BackInsides: FC = () => {
  return (
    <>
      <RightInside>
        <div className="shadow" />
      </RightInside>
      <RightCover>
        <div className="shadow" />
      </RightCover>
    </>
  )
}

const RightInside = styled.div`
  position: absolute;
  width: 360px;
  height: 300px;

  transform: translateX(20px);

  background-color: #0090e3;
`

const RightCover = styled.div`
  position: absolute;
  width: 400px;
  height: 20px;

  transform: rotateX(90deg) translateY(-10px) translateZ(10px);

  background-color: #0090e3;
`

export default BackInsides