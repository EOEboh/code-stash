import React, { Fragment } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HomeContent from "@/components/home/HomeContent";

const Home = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  /* <div>{session?.user?.name}</div> */

  return (
    <Fragment>
      <HomeContent />
    </Fragment>
  );
};

export default Home;
