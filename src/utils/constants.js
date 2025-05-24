let apiRoot = "";

if (import.meta.env.MODE === "development") {
  apiRoot = "http://localhost:8017";
}
if (import.meta.env.MODE === "production") {
  apiRoot = "https://trello-api-edvy.onrender.com";
}
export const API_ROOT = apiRoot;

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 12;

export const CARD_MEMBER_ACTONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};
