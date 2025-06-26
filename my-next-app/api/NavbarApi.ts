import { apiCore } from "./ApiCore";


export const getNavbarData = async () => {
  const response = await apiCore(`/header`, "GET");
  return response;
};
