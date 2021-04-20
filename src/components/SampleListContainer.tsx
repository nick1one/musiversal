import React, { ReactElement, useEffect, useState } from "react";
import Sample from "./Sample";
import axios from "axios";

export const SampleListContainer = (): ReactElement => {
  const [sampleList, saveSampleList] = useState([]);
  useEffect(() => {
    async function getSampleList() {
      try {
        const response = await axios.get("http://localhost:3001/samples");
        const {
          data: { samples },
        } = response;
        saveSampleList(samples);
      } catch (error) {
        console.error(error);
      }
    }
    getSampleList();
  }, []);

  return (
    <>
      {sampleList.map(({ id, name, duration }) => (
        <Sample key={id} sampleName={name} duration={duration} />
      ))}
    </>
  );
};
