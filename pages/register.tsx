import { Button } from "@mui/material";
import React from "react";
import { useAuth } from "src/context/authContext";

const Register = () => {
  const { currentUser, signInWithGoogle, register } = useAuth();

  const handleRegister = () => {
    register("salmanfazal01@gmail.com", "Salmanfazal01.")
      .then((res) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      Current user: {currentUser?.email}
      <Button onClick={handleRegister}>Create user</Button>
    </div>
  );
};

export default Register;
