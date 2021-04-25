import React from "react";
import styled from "styled-components";
import { Spinner } from "./Spinner";

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  margin: 12px;
  background: none;
  cursor: pointer;
  :disabled {
    opacity: 0.5;
  }
  &.isPlaying,
  &:hover:enabled {
    circle {
      fill: #de6139;
    }
    path,
    rect {
      fill: #fff;
      stroke: #fff;
    }
  }
  &:active:enabled {
    svg {
      transform: scale(0.9, 0.9);
    }
  }
`;

interface PlayButtonProps {
  onClickHandler?: any;
  isPlaying?: boolean;
  isLoading?: boolean;
  isDisabled: boolean;
}

export const PlayButton = ({
  isDisabled = false,
  isLoading = false,
  isPlaying = false,
  onClickHandler = () => {
    console.log("play");
  },
}: PlayButtonProps) => {
  return isLoading ? (
    <Spinner size={40} />
  ) : (
    <StyledButton
      disabled={isDisabled}
      onClick={onClickHandler}
      className={isPlaying ? "isPlaying" : ""}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#E5E7EB" />
        {isPlaying ? (
          <rect
            id="svg_14"
            height="9.375"
            width="9.375"
            y="11.1875"
            x="11.4375"
            fillOpacity="null"
            strokeOpacity="null"
            strokeDasharray="null"
            strokeWidth="2"
            stroke="#9CA3AF"
            fill="#9CA3AF"
          />
        ) : (
          <path
            d="M12.875 20.875L13.1172 20.7318L21.125 16L20.375 15.5567L12.875 11.125V20.875Z"
            fill="#9CA3AF"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </StyledButton>
  );
};
