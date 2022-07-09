import React from "react";
import { Layout } from "antd";

import Topnav from "components/Topnav";
import Home from "pages/Home";
import Department from "pages/Department";
import Doc from "pages/Doc";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const { Content } = Layout;

const GlobalLayout = () => {
   return (
      <BrowserRouter>
         <Layout style={{ height: "100vh" }}>
            <Topnav></Topnav>
            <Layout style={{ backgroundColor: "#fff", height: "100%" }}>
               <Routes>
                  <Route path="/" exact element={<Home></Home>}></Route>
                  <Route
                     path="department"
                     element={<Department></Department>}
                  ></Route>
                  <Route path="/doc/:id" element={<Doc />} />
               </Routes>
            </Layout>
         </Layout>
      </BrowserRouter>
   );
};

export default GlobalLayout;
