import { routes } from "../routes/routes";

export const navConstants = [
  {
    label: "Personal Form",
    path: routes.FORM,
  },
  {
    label: "User Details",
    path: routes.USERS,
  },
  {
    label: "Country",
    path: routes.COUNTRY_LIST,
  },
];

export const topBarConstants = {
  PERSONAL_FORM: "Personal Form",
  USER_DETAILS: "User Details",
  COUNTRY_LIST: "Country List",
  COUNTRY_DETAILS: "Country Detail",
};
