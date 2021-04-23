import { ChangeEvent } from "react";
import styled from "styled-components";

interface TrackNameProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
}

export const TrackName = (props: TrackNameProps) => <StyledInput {...props} />;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  color: #1f2937;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.03em;
`;
