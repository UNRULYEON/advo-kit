import { FC } from 'react'
import styled from 'styled-components'

const TopInsides: FC = () => {
  return (
    <>
      <TopTop />
      <TopTopInside />

      <TopRightOutside>
        <div className="shadow" />
      </TopRightOutside>
      <TopRightInside>
        <div className="shadow" />
      </TopRightInside>
      <TopRightCover>
        <div className="shadow" />
      </TopRightCover>

      <TopLeftOutside>
        <div className="shadow" />
      </TopLeftOutside>
      <TopLeftInside>
        <div className="shadow" />
      </TopLeftInside>
      <TopLeftCover>
        <div className="shadow" />
      </TopLeftCover>

      <TopFrontOutside>
        <div className="shadow" />
      </TopFrontOutside>
      <TopFrontInside>
        <div className="shadow" />
      </TopFrontInside>
      <TopFrontCover>
        <div className="shadow" />
      </TopFrontCover>

      <TopBackOutside>
        <div className="shadow" />
      </TopBackOutside>
      <TopBackInside>
        <div className="shadow" />
      </TopBackInside>
      <TopBackCover>
        <div className="shadow" />
      </TopBackCover>

      <TopBottom />
    </>
  )
}

// TOP
const TopTop = styled.div`
  position: absolute;
  width: 400px;
  height: 401px;

  transform: translateZ(30px);

  background-color: #0090e3;
`

const TopTopInside = styled.div`
  position: absolute;
  width: 360px;
  height: 360px;

  transform: translateX(20px) translateY(20px) translateZ(29px);

  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
`

const TopBottom = styled.div`
  width: 400px;
  height: 400px;

  transform: translateZ(0px);

  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
`

// RIGHT
const TopRightOutside = styled.div`
  position: absolute;
  height: 400px;
  width: 30px;

  transform: rotateY(90deg) translateZ(385px) translateX(-15px);

  background-color: #0090e3;
`
const TopRightInside = styled.div`
  position: absolute;
  height: 360px;
  width: 30px;

  transform: rotateY(90deg) translateZ(365px) translateX(-15px) translateY(20px);

  background-color: #0090e3;
`

const TopRightCover = styled.div`
  position: absolute;
  height: 360px;
  width: 20px;
  /* 
  border-right: 20px solid #0090e3;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent; */
  background-color: #0090e3;

  transform: translateX(380px) translateY(20px);
`

// LEFT
const TopLeftOutside = styled.div`
  position: absolute;
  height: 400px;
  width: 30px;

  transform: rotateY(90deg) translateZ(-15px) translateX(-15px);

  background-color: #0090e3;
`

const TopLeftInside = styled.div`
  position: absolute;
  height: 360px;
  width: 30px;

  transform: rotateY(90deg) translateZ(5px) translateX(-15px) translateY(20px);

  background-color: #0090e3;
`

const TopLeftCover = styled.div`
  position: absolute;
  height: 360px;
  width: 20px;

  /* border-left: 20px solid #0090e3;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent; */
  background-color: #0090e3;

  transform: translateY(20px);
`

// FRONT
const TopFrontOutside = styled.div`
  position: absolute;
  height: 400px;
  width: 30px;

  transform: rotateY(90deg) rotateX(90deg) translateZ(-200px) translateY(185px)
    translateX(-15px);

  background-color: #0090e3;
`

const TopFrontInside = styled.div`
  position: absolute;
  height: 360px;
  width: 30px;

  transform: rotateY(90deg) rotateX(90deg) translateZ(-200px) translateY(185px)
    translateX(-15px);

  background-color: #0090e3;
`

const TopFrontCover = styled.div`
  position: absolute;
  width: 400px;
  height: 20px;
  /* 
  border-right: 20px solid #0090e3;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent; */
  background-color: #0090e3;

  transform: translateY(380px);
`

// BACK
const TopBackOutside = styled.div`
  position: absolute;
  height: 400px;
  width: 30px;

  transform: rotateY(90deg) rotateX(90deg) translateZ(200px) translateY(185px)
    translateX(-15px);

  background-color: #0090e3;
`

const TopBackInside = styled.div`
  position: absolute;
  height: 360px;
  width: 30px;

  transform: rotateY(90deg) rotateX(90deg) translateZ(160px) translateY(185px)
    translateX(-15px);

  background-color: #0079be;
`

const TopBackCover = styled.div`
  position: absolute;
  width: 400px;
  height: 20px;
  /* 
  border-right: 20px solid #0090e3;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent; */
  background-color: #0090e3;

  transform: translateY(0px);
`

export default TopInsides
