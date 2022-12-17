import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { deleteCookie } from "../utils";
import { useAppContext } from "../src/context/AppContext";
import { fetchSession } from "../src/fetch/fetchSession";

export default function Session() {
  const router = useRouter();
  const { user, setUser, setToken } = useAppContext();

  const getUserInfo = async () => {
    try {
      const res = await fetchSession();

      const { user, success, token } = res;

      if (!success) {
        router.push("/login");
        return;
      }
      setUser(user);
      setToken(token);
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="wrapper">
      <h1>Welcome, {user && user.name}</h1>
      {user && user.email}
      {/* <div className="message">
        {isFetching ? "fetching details.." : message}
      </div> */}

      <button
        style={{ height: "30px" }}
        onClick={() => {
          handleLogout();
        }}
      >
        logout
      </button>
    </div>
  );
}
