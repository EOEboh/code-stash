import React from "react";
import Login from "@/components/forms/Login";

const LoginPage = () => {
  return <Login />;
};
export default LoginPage;

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
