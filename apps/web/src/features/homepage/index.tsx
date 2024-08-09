"use client";

import Category from "./component/Category";
import Jumbotron from "./component/Jumbotron";
import TopEvent from "./component/TopEvent";

import UpcomingEvent from "./component/UpcomingEvent";

const words = `Live the Moment, Love the Experience`;

const Homepage = () => {
  return (
    <>
      <Jumbotron />
      <UpcomingEvent />
      <TopEvent />
      <Category />
    </>
  );
};

export default Homepage;
