import React, { useContext } from "react";

import { AuthDispatch, AuthContext } from "contexts/AuthContext";
import Logo from "assets/Logo.png";

import { Modal } from "antd";

const { confirm } = Modal;

const Topnav = () => {
   const dispatch = useContext(AuthDispatch);
   const state = useContext(AuthContext);

   const showConfirm = () => {
      confirm({
         title: "really wanna leave?",
         onOk() {
            onLogout();
         },
         onCancel() {
            // console.log("Cancel");
         },
      });
   };

   const onLogout = () => {
      dispatch({ type: "LOGOUT", payload: {} });
   };

   return (
      <nav className="bg-gray-800">
         <div className="md:w-4/5 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
               <div className="flex justify-between items-center w-full">
                  <div className="flex items-center justify-center">
                     <img className="h-12 w-12" src={Logo} alt="Workflow" />
                     <span className="text-white ml-3  text-sm font-medium">
                        Tracking doc
                     </span>
                  </div>
                  <div className="">
                     <div className="flex items-baseline space-x-4">
                        <a
                           href="#"
                           className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                           Home
                        </a>

                        <button
                           onClick={showConfirm}
                           href="#"
                           className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                           Logout
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Topnav;
