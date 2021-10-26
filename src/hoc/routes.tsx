import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "src/context/authContext";

export function withPublic(Component) {
  return function WithPublic(props) {
    const { currentUser, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return <h1>Loading...</h1>;
    }

    if (currentUser?.accessToken) {
      typeof window !== "undefined" && router.replace("/dashboard");
    }
    return <Component auth={currentUser} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const { currentUser, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return <h1>Loading...</h1>;
    }

    if (!currentUser?.accessToken) {
      typeof window !== "undefined" && router.replace("/login");
      return <h1>Loading...</h1>;
    }
    return <Component auth={currentUser} {...props} />;
  };
}
