import React from "react";
import styled, { keyframes } from "styled-components";
import { useWindowSize } from "../../utils/useWindowSize";

function GradientStyle() {
  const { width, height } = useWindowSize();

  console.log(width, height);

  const moveGrad = keyframes`
    0%{
        transform: translate(0, 0);
    }
    50%{
        transform: translate(${width}px, ${height / 2}px);
    }
    100%{
        transform: translate(0, 0);
    }
`;

  const GradStyle = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -37vh;
    margin-top: -37vh;
    background: linear-gradient(
      90deg,
      rgba(36, 0, 35, 1) 0%,
      rgba(8, 0, 43, 1) 0%,
      rgba(2, 2, 130, 1) 0%,
      rgba(231, 0, 255, 1) 100%
    );
    filter: blur(350px);
    animation: ${moveGrad} 15s alternate linear infinite;
  `;

  return <GradStyle></GradStyle>;
}

export default GradientStyle;
