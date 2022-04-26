import React from "react";
import { Layout } from "antd";

import Topnav from "components/Topnav";
import Home from "pages/Home";

const { Content } = Layout;

const GlobalLayout = () => {
   return (
      <Layout style={{ height: "100vh" }}>
         <Topnav></Topnav>
         <Layout style={{ backgroundColor: "#fff", height: "100%" }}>
            <Home></Home>
         </Layout>
      </Layout>
   );
};

export default GlobalLayout;
