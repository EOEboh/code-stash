import React from "react";
import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return <LoginForm />;
};
export default Login;

// const Login = () => {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signIn("github");
//       }}
//     >
//       <button type="submit">Sign in with GitHub</button>
//     </form>
//   );
// };
