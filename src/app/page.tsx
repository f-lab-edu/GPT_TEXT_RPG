"use client";
import { GameDescBox } from "@/components/GameDesc/GameDescBox";
import { Logo } from "@/components/Logo/Logo";
import { stageNumber } from "../../constant/constants";

export default function Home() {
  return (
    <>
      <Logo />
      <GameDescBox descHeader={stageNumber[0]} desc={"설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명"} startButtonDesc={"Start"} buttonDesc={""} />
    </>
  );
}
