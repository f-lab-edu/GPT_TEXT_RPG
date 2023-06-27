import { styled } from "styled-components";
import { FloatButton } from "../floatButton/FloatButton";
import { StartButton } from "../floatButton/StartButton";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { GlowText } from "../glowText/GlowText";

const stageResultState = atom<string[]>({
  key: "stageResult",
  default: [],
});

const gptResultState = atom<string>({
  key: "gptResult",
  default: "",
});

type StageResult = {
  [key: string]: number;
};

interface GameDescBoxProps {
  descHeader: string;
  desc: string;
  startButtonDesc?: string;
  buttonDesc: [{ text: string; state: string }] | undefined;
  stageNumber: string;
}

export const GameDescBox = ({ descHeader, desc, startButtonDesc, buttonDesc, stageNumber }: GameDescBoxProps) => {
  const [gptResult, setGptResult] = useRecoilState(gptResultState);
  const [stageResult, setStageResult] = useRecoilState<string[]>(stageResultState);

  async function clickHandlerGPT() {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: JSON.stringify(stageResult) }),
      });

      console.log(response);

      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setGptResult(data.result);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  }

  const clickHandler = (buttonState: string) => {
    setStageResult((prevResult: StageResult) => {
      const updatedResult = { ...prevResult };
      if (updatedResult[buttonState]) {
        updatedResult[buttonState] += 1;
      } else {
        updatedResult[buttonState] = 1;
      }
      return updatedResult;
    });

    if (stageNumber === "10") {
      clickHandlerGPT();
    }
  };

  console.log(stageResult);

  return (
    <>
      <GlowText size={40} desc={descHeader} />
      <Desc>{desc}</Desc>
      <ButtonBox>
        {!!startButtonDesc ? (
          <StartButton startButtonDesc={startButtonDesc} />
        ) : (
          buttonDesc.map((choice, i) => <FloatButton buttonDesc={choice.text} buttonIndex={i} key={i} stageNumber={stageNumber} clickHandler={clickHandler} buttonState={choice.state} />)
        )}
      </ButtonBox>
    </>
  );
};

const Desc = styled.div`
  margin: 60px 20px 40px;
  font-size: 20px;
  text-align: center;
  line-height: 1.5;
  color: #ffffff;
  @media (max-width: 800px) {
    font-size: 3vw;
  }
  p {
    font-size: 25px;
    @media (max-width: 800px) {
      font-size: 3vw;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  a {
    width: 70%;
  }
`;
