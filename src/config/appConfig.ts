import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoLight from "src/assets/images/logo-light.png";
import LogoDark from "src/assets/images/logo-dark.png";

export default {
  projectName: "Next Boilerplate",
  logoLight: LogoLight,
  logoDark: LogoDark,

  dashboard: {
    menuItems: [
      {
        link: "/dashboard",
        grants: [],
        text: "dashboard",
        icon: DashboardIcon,
      },
      {
        link: "/contacts",
        grants: ["administrator"],
        text: "contacts",
        icon: PeopleIcon,
      },
      {
        grants: ["administrator"],
        text: "my_account",
        icon: AccountCircleIcon,
        nestedItems: [
          {
            link: "/dashboard/test",
            grants: ["administrator"],
            text: "test",
          },
          {
            link: "/dashboard/my-account",
            grants: ["administrator"],
            text: "my_account",
          },
        ],
      },
    ],
  },
};
