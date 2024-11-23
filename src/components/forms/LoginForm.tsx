import React from "react";
import { Button } from "../ui/button";
import { doOAuthLogin } from "@/app/lib/actions";

const LoginForm = () => {
  return (
    <form action={doOAuthLogin}>
      <Button type="submit" name="action" value={"google"}>
        Sign In With Google
      </Button>
      <Button type="submit" name="action" value={"github"}>
        Sign In With GitHub
      </Button>
    </form>
  );
};

export default LoginForm;
