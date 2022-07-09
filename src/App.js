import React, { useContext, useEffect } from "react";

import { AuthContext, AuthDispatch } from "contexts/AuthContext";

import GlobalLayout from "layouts/GlobalLayout";
import Login from "pages/Login";

import "antd/dist/antd.min.css";

function App() {
   const authState = useContext(AuthContext);
   const authDispatch = useContext(AuthDispatch);

   useEffect(() => {
      let user = localStorage.getItem("user")
         ? JSON.parse(localStorage.getItem("user"))
         : "";

      if (user)
         authDispatch({
            type: "LOGIN_SUCCESS",
            payload: { user },
         });
   }, []);

   return (
      <div className="App">
         {authState.isAuthenticated && <GlobalLayout></GlobalLayout>}
         {!authState.isAuthenticated && <Login></Login>}
      </div>
   );
}

export default App;
