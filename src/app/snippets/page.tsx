import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Tags from "@/components/snippets/Tags";

const Home = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col items-center flex-1 overflow-hidden">
      <Tags />

      <div>{session?.user?.name}</div>
    </div>
  );
};

export default Home;
