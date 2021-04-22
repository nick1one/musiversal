import React from "react";
import styled from "styled-components";
import { NO_TRACKS_MESSAGE, TRACKS_TITLE } from "../constants";

interface SavedTracksProps {
  tracks?: any;
}
export const SavedTracks = ({ tracks = [] }: SavedTracksProps) => (
  <>
    <Title>{TRACKS_TITLE}</Title>
    {!tracks.length && <NoTracksMessage>{NO_TRACKS_MESSAGE}</NoTracksMessage>}
  </>
);

export const NoTracksMessage = styled.p`
  margin: 14px 12px;
  color: #666f7c;
  letter-spacing: -0.03em;
`;

export const Title = styled.h2`
  margin: 40px 12px 12px 12px;
  color: #4c4e50;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 22px;
`;
