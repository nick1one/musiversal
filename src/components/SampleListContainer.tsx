import React, { ReactElement, useEffect, useState } from "react";
import { Sample } from "./Sample";
import axios from "axios";

const getName = (fullName: string): string => fullName.split(".")[0];

export const SampleListContainer = (): ReactElement => {
  const [sampleList, saveSampleList] = useState([]);
  useEffect(() => {
    async function getSampleList() {
      try {
        const response = await axios.get("http://localhost:3001/samples");
        const {
          data: { samples },
        } = response;
        saveSampleList(samples.map((fullName: string) => getName(fullName)));
      } catch (error) {
        console.error(error);
      }
    }
    getSampleList();
  }, []);

  return (
    <>
      {sampleList.map((value, index) => (
        <Sample key={index} sampleName={value} />
      ))}
    </>
  );
};
