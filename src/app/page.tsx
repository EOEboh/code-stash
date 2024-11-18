import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex flex-around items-center">
      <Image src={"/logo.svg"} width={50} height={50} alt="" />
      <p>Code Stash</p>
    </div>
  );
}
function LoginBtn() {
  return (
    <Button variant="destructive" className="md:px-4 px-8">
      Log In
    </Button>
  );
}
function SignUpBtn() {
  return (
    <Button variant="outline" className="md:px-4 px-8">
      Sign Up
    </Button>
  );
}
function Buttons() {
  return (
    <div className="flex flex-col md:flex-row gap-2 ">
      <LoginBtn />
      <SignUpBtn />
    </div>
  );
}

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <main className="h-screen flex flex-col items-center justify-center gap-2">
        <section className="text-center">
          <h1>Welcome to Our Website</h1>
          <p>Discover amazing features and great deals</p>
        </section>

        <Buttons />
      </main>
    </>
  );
};

export default Home;
