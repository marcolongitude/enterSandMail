import { ROUTES } from "../constants"; 

const goTo = (path: string, params: boolean = false) => {
  window.location.replace(
    decodeURIComponent((path || ROUTES.HOME) + (params ? params : "")) 
  );
};

export const flowService = {
  goTo
};