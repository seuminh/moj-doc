import { Collapse } from "antd";
import React, { useState, useEffect } from "react";

import { supabase } from "supabaseClient";

const { Panel } = Collapse;

const Department = () => {
   const [userList, setUserList] = useState(null);

   const fetchUser = async () => {
      const { data } = await supabase
         .from("users")
         .select(`name, phone_number,department,telegram`);

      setUserList(data);
   };

   useEffect(() => {
      fetchUser();
   }, []);

   console.log(userList);

   return (
      <div className="md:w-4/5 md:mx-auto p-5">
         <p className="text-center font-bold text-lg">Department</p>

         <div className="md:w-2/5 md:mx-auto">
            <Collapse defaultActiveKey={["1", "6"]}>
               <Panel header="រដ្ឋបាល" key="1">
                  <dl>
                     {userList
                        ?.filter((v) => v.department === 1)
                        .map((v) => {
                           let telegram = `https://t.me/${v.telegram}`;
                           return (
                              <div
                                 key={v.phone_number}
                                 className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                              >
                                 <dt className="text-sm font-medium text-gray-500">
                                    {v.name}
                                 </dt>
                                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span>
                                       {v.phone_number}

                                       <i
                                          className="fa fa-telegram"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             window.open(telegram, "_blank");
                                          }}
                                          style={{
                                             fontSize: 20,
                                             marginLeft: 5,
                                             color: "#0088cc",
                                          }}
                                       ></i>
                                    </span>
                                 </dd>
                              </div>
                           );
                        })}
                  </dl>
               </Panel>
               <Panel header="ហិរញ្ញវត្ថុ" key="2">
                  <dl>
                     {userList
                        ?.filter((v) => v.department === 2)
                        .map((v) => {
                           let telegram = `https://t.me/${v.telegram}`;

                           return (
                              <div
                                 key={v.phone_number}
                                 className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                              >
                                 <dt className="text-sm font-medium text-gray-500">
                                    {v.name}
                                 </dt>
                                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span>
                                       {v.phone_number}

                                       <i
                                          className="fa fa-telegram"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             window.open(telegram, "_blank");
                                          }}
                                          style={{
                                             fontSize: 20,
                                             marginLeft: 5,
                                             color: "#0088cc",
                                          }}
                                       ></i>
                                    </span>
                                 </dd>
                              </div>
                           );
                        })}
                  </dl>
               </Panel>
               <Panel header="បុគ្គលិក" key="3">
                  <dl>
                     {userList
                        ?.filter((v) => v.department === 3)
                        .map((v) => {
                           let telegram = `https://t.me/${v.telegram}`;

                           return (
                              <div
                                 key={v.phone_number}
                                 className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                              >
                                 <dt className="text-sm font-medium text-gray-500">
                                    {v.name}
                                 </dt>
                                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span>
                                       {v.phone_number}

                                       <i
                                          className="fa fa-telegram"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             window.open(telegram, "_blank");
                                          }}
                                          style={{
                                             fontSize: 20,
                                             marginLeft: 5,
                                             color: "#0088cc",
                                          }}
                                       ></i>
                                    </span>
                                 </dd>
                              </div>
                           );
                        })}
                  </dl>
               </Panel>
               <Panel header="សម្ភារៈ" key="4">
                  <dl>
                     {userList
                        ?.filter((v) => v.department === 4)
                        .map((v) => {
                           let telegram = `https://t.me/${v.telegram}`;

                           return (
                              <div
                                 key={v.phone_number}
                                 className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                              >
                                 <dt className="text-sm font-medium text-gray-500">
                                    {v.name}
                                 </dt>
                                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span>
                                       {v.phone_number}

                                       <i
                                          className="fa fa-telegram"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             window.open(telegram, "_blank");
                                          }}
                                          style={{
                                             fontSize: 20,
                                             marginLeft: 5,
                                             color: "#0088cc",
                                          }}
                                       ></i>
                                    </span>
                                 </dd>
                              </div>
                           );
                        })}
                  </dl>
               </Panel>
               <Panel header="ខុទ្ទកាល័យ" key="5">
                  <dl>
                     {userList
                        ?.filter((v) => v.department === 6)
                        .map((v) => {
                           let telegram = `https://t.me/${v.telegram}`;

                           return (
                              <div
                                 key={v.phone_number}
                                 className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                              >
                                 <dt className="text-sm font-medium text-gray-500">
                                    {v.name}
                                 </dt>
                                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span>
                                       {v.phone_number}

                                       <i
                                          className="fa fa-telegram"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             window.open(telegram, "_blank");
                                          }}
                                          style={{
                                             fontSize: 20,
                                             color: "#0088cc",
                                             marginLeft: 5,
                                          }}
                                       ></i>
                                    </span>
                                 </dd>
                              </div>
                           );
                        })}
                  </dl>
               </Panel>
               <Panel header="អគ្គលេខាធិការដ្ឋាន" key="6">
                  <dl>
                     {userList
                        ?.filter((v) => v.department === 7)
                        .map((v) => {
                           let telegram = `https://t.me/${v.telegram}`;

                           return (
                              <div
                                 key={v.phone_number}
                                 className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                              >
                                 <dt className="text-sm font-medium text-gray-500">
                                    {v.name}
                                 </dt>
                                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span>
                                       {v.phone_number}

                                       <i
                                          className="fa fa-telegram"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             window.open(telegram, "_blank");
                                          }}
                                          style={{
                                             fontSize: 20,
                                             marginLeft: 5,
                                             color: "#0088cc",
                                          }}
                                       ></i>
                                    </span>
                                 </dd>
                              </div>
                           );
                        })}
                  </dl>
               </Panel>
            </Collapse>
         </div>
      </div>
   );
};

export default Department;
