import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Tags from "@/components/snippets/Tags";
import AllSnippets from "@/components/snippets/AllSnippets";

const Home = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col justify-start items-center flex-1 overflow-hidden">
      <Tags />
      <AllSnippets />

      {/* <div>{session?.user?.name}</div> */}
    </div>
  );
};

export default Home;
