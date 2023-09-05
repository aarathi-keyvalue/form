import { CountryIcon, FormIcon, UserIcon } from "../assets/icons";
import { routes } from "../routes/routes";

export const navConstants = [
  {
    label: "Personal Form",
    path: routes.FORM,
    icon: FormIcon,
  },
  {
    label: "User Details",
    path: routes.USERS,
    icon: UserIcon,
  },
  {
    label: "Country",
    path: routes.COUNTRY_LIST,
    icon: CountryIcon,
  },
];

export const topBarConstants = {
  PERSONAL_FORM: "Personal Form",
  USER_DETAILS: "User Details",
  COUNTRY_LIST: "Country List",
  COUNTRY_DETAILS: "Country Detail",
};
