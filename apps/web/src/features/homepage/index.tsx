"use client";

import { useSession } from "next-auth/react";
import Jumbotron from "./components/Jumbotron";
import TopEvent from "./components/TopEvent";
import UpcomingEvent from "./components/UpcomingEvent";
import Category from "./components/Category";

const words = `Live the Moment, Love the Experience`;

const Homepage = () => {
  // const session = useSession()
  return (
    <>
      <Jumbotron />
      <UpcomingEvent />
      <TopEvent />
      <Category />
      {/* {session.data?.user.name} */}
    </>
  );
};

export default Homepage;
