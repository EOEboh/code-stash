import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ContentArea from "@/components/snippets/ContentArea";
import ContentEditor from "@/components/snippets/ContentEditor";

const Home = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  /* <div>{session?.user?.name}</div> */

  return (
    <div className="flex overflow-hidden gap-2 mt-2 mx-2">
      <ContentArea />
      <ContentEditor />
    </div>
  );
};

export default Home;
