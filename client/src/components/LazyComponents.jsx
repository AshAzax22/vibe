import { lazy } from "react";

const Landing = lazy(() => import("../pages/landing/Landing"));
const SignUp = lazy(() => import("../pages/signup/SignUp"));
const UserOnboarding = lazy(() =>
  import("../pages/userOnboarding/UserOnboarding")
);
const Home = lazy(() => import("../pages/home/Home"));
const Feed = lazy(() => import("../pages/home/components/Feed"));
const CreatePoll = lazy(() => import("../pages/home/components/CreatePoll"));
const Profile = lazy(() => import("../pages/home/components/Profile"));
const PollDetails = lazy(() => import("../pages/home/components/PollDetails"));
const NotFound = lazy(() => import("../components/NotFound"));

export {
  Landing,
  SignUp,
  UserOnboarding,
  Home,
  Feed,
  CreatePoll,
  Profile,
  PollDetails,
  NotFound,
};
