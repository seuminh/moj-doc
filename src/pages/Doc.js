import { Button, Steps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import moment from "moment";

import { supabase } from "supabaseClient";

const { Step } = Steps;

const Doc = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const [statusList, setStatusList] = useState(null);
   const [userList, setUserList] = useState(null);

   const fetchStatus = async () => {
      const { data } = await supabase.from("status").select(`id, name,color`);

      setStatusList(data);
   };

   const fetchUser = async () => {
      const { data } = await supabase
         .from("users")
         .select(`id,name, department`);

      setUserList(data);
   };

   useEffect(() => {
      fetchStatus();
      fetchUser();
   }, []);

   if (location.state === null || userList === null || statusList === null) {
      return (
         <div className="md:w-4/5 md:mx-auto p-5">
            <p>Loading</p>
         </div>
      );
   }

   const data = location.state.data;

   return (
      <div className="md:w-4/5 md:mx-auto p-5">
         <Button onClick={() => navigate(-1)}>Go back</Button>

         <p className="text-center font-bold text-lg">Document Detail</p>

         <div className="md:w-4/5 md:mx-auto">
            <dl>
               <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">លេខចុះ</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                     {data.id}
                  </dd>
               </div>
               <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                     ប្រភពលិខិត
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                     {data.source}
                  </dd>
               </div>
               <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                     កម្មវត្ថុ
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                     {data.title}
                  </dd>
               </div>
               <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                     Department
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                     {data.department !== null ? data.department.name : ""}
                  </dd>
               </div>
               <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                     Stamp No
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                     <div>
                        <p>ក្រសួងយុត្តិធម៌ : {data.moj_stamp}</p>
                        <p>ខុទ្ទកាល័យ : {data.office_stamp}</p>
                     </div>
                  </dd>
               </div>
               <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">History</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                     <Steps
                        direction="vertical"
                        size="small"
                        current={data.documents_history.length}
                     >
                        <Step
                           title="ចុះលេខត្រារួច"
                           description={moment(data.created_at).format(
                              "DD/MM/YYYY hh:mm"
                           )}
                        />
                        {data.documents_history.map((v) => {
                           let status = statusList.find(
                              (v1) => v1.id === v.status
                           );
                           let fromUser = userList.find((v2) => v2.id === v.by);
                           let toUser = userList.find((v3) => v3.id === v.to);

                           return (
                              <Step
                                 key={v.created_at}
                                 title={status.name}
                                 description={`ដោយ ${
                                    fromUser !== undefined
                                       ? fromUser.name
                                       : "..."
                                 } ទៅកាន់ ${
                                    toUser !== undefined ? toUser.name : "..."
                                 } ${moment(v.created_at).format(
                                    "DD/MM/YYYY hh:mm"
                                 )}`}
                              />
                           );
                        })}
                     </Steps>
                  </dd>
               </div>
            </dl>
         </div>
      </div>
   );
};

export default Doc;
