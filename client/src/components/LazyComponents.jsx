import { lazy } from "react";

const Landing = lazy(() => import("../pages/landing/Landing"));
const SignUp = lazy(() => import("../pages/signup/SignUp"));
const UserOnboarding = lazy(() =>
  import("../pages/userOnboarding/UserOnboarding")
);
const Home = lazy(() => import("../pages/home/Home"));
const Feed = lazy(() => import("../pages/home/components/Feed/Feed"));
const CreatePoll = lazy(() =>
  import("../pages/home/components/CreatePoll/CreatePoll")
);
const Profile = lazy(() => import("../pages/home/components/Profile/Profile"));
const PollDetails = lazy(() =>
  import("../pages/home/components/Poll/PollDetails")
);
const Settings = lazy(() =>
  import("../pages/home/components/Settings/Settings")
);
const NotFound = lazy(() => import("../components/NotFound"));

export {
  Landing,
  SignUp,
  UserOnboarding,
  Home,
  Feed,
  CreatePoll,
  Profile,
  Settings,
  PollDetails,
  NotFound,
};
