import React from "react";
import styled from "styled-components";
import { NO_TRACKS_MESSAGE, TRACKS_TITLE } from "../constants";
import { TrackListItem } from "../store/tracksSlice";
import { SoundFileBlock } from "./SoundFileBlock";
import { Spinner } from "./Spinner";

interface SavedTracksProps {
  isLoading: boolean;
  tracks?: TrackListItem[];
}

export const SavedTracks = ({ tracks = [], isLoading }: SavedTracksProps) => {
  const trackListContent = isLoading ? (
    <Spinner />
  ) : (
    <>
      {tracks.map((props) => (
        <SoundFileBlock key={props.id} {...props} />
      ))}
      {!tracks.length && <NoTracksMessage>{NO_TRACKS_MESSAGE}</NoTracksMessage>}
    </>
  );
  return (
    <Wrapper>
      <Title>{TRACKS_TITLE}</Title>
      {trackListContent}
    </Wrapper>
  );
};

const NoTracksMessage = styled.p`
  color: #666f7c;
  letter-spacing: -0.03em;
`;

const Title = styled.h2`
  color: #4c4e50;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 22px;
`;

const Wrapper = styled.div`
  max-width: 380px;
  padding: 40px 25px 14px;
`;
