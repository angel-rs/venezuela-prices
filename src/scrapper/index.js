// import { scrapRedemerca } from "./redemerca";
import { scrapBodegon } from "./bodegon";

export const scrap = async (updateProducts) => {
  await Promise.all([
    scrapBodegon(updateProducts),
    // scrapRedemerca(updateProducts),
  ]);
};
