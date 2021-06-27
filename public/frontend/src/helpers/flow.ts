import { ROUTES } from "../constants"; 

const goTo = (path: any, params: any = false) => {
  window.location.replace(
    decodeURIComponent((path || ROUTES.HOME) + (params ? params : "")) 
  );
};

export const flowService = {
  goTo
};