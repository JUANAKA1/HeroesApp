import type { SummaryInformationResponse } from "../types/summary-information.response";
import { heroApi } from "../api/hero.api";

export const getSummaryAction = async () => {
  const { data } = await heroApi.get<SummaryInformationResponse>("/summary");
  return data;
};
