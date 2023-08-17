import { CountryIcon, UserIcon } from "../assets/icons";
import { routes } from "../routes/routes";

export const navConstants = [
  {
    label: "Personal Details",
    path: routes.FORM,
    icon: UserIcon,
  },
  {
    label: "Country",
    path: routes.COUNTRY_LIST,
    icon: CountryIcon,
  },
];

export const topBarConstants = {
  PERSONAL_DETAILS: "Personal Details",
  COUNTRY_LIST: "Country List",
  COUNTRY_DETAILS: "Country Detail",
};
