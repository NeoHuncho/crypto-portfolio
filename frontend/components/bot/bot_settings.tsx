import React from "react";
import type { DocumentData } from "@firebase/firestore";
import { FirstSetup } from "./first_setup";
interface BotSettingsProps {
  data: DocumentData;
}

export const BotSettings = ({ data }: BotSettingsProps) => {
  if (!data.exists) return <FirstSetup />;
  return <></>;
};
