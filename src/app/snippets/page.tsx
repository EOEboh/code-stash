import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  return <div>{session?.user?.name}</div>;
};

export default Home;
