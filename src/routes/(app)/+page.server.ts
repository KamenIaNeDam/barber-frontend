import { getMainPage } from "@entities/main/api.js";

export async function load({ fetch }) {
  const mainPage = await getMainPage(fetch);

  return {
    mainPage,
  };
}
