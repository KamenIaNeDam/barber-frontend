import { api } from "@shared/api/base";
import type { MainPageModel } from "./model";

const MAIN_PAGE_PATH = "/api/main";

export async function getMainPage(fetchFn: typeof fetch) {
  return await api<MainPageModel>(fetchFn, `${MAIN_PAGE_PATH}`);
}
