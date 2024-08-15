"use client";

import { useSession } from "next-auth/react";
import Category from "./component/Category";
import Jumbotron from "./component/Jumbotron";
import TopEvent from "./component/TopEvent";

import UpcomingEvent from "./component/UpcomingEvent";

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
