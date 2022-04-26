import React, { useState, useEffect } from "react";

import { List, Avatar, Space } from "antd";

import { supabase } from "supabaseClient";

const DocumentList = () => {
   const [documents, setDocuments] = useState(null);

   const fetchDocument = async () => {
      const { data } = await supabase
         .from("documents")
         .select(
            `id,
        title,
        documents_history(status, by, to, created_at),
        department(name),
        stamp_no,source,moj_stamp,office_stamp`
         )
         .order("created_at", {
            foreignTable: "documents_history",
            ascending: false,
         })
         .limit(1, { foreignTable: "documents_history" })
         .order("id", { ascending: false });

      setDocuments(data);
   };

   // const fetchStatus = async () => {
   //    const { data } = await supabase
   //       .from("status")
   //       .select("*")
   //       .order("id", { ascending: true });

   //    console.log(data);
   // };

   // const fetchDepartment = async () => {
   //    const { data } = await supabase
   //       .from("departments")
   //       .select(`id, name,users(id, telegram, name,department,phone_number)`)
   //       .order("id");

   //    console.log(data);
   // };

   useEffect(() => {
      fetchDocument();
      // fetchStatus();
      // fetchDepartment();
   }, []);

   if (!documents) {
      return (
         <div>
            <p>Loading</p>
         </div>
      );
   }

   return (
      <div>
         <List
            itemLayout="vertical"
            dataSource={documents}
            renderItem={(item) => (
               <List.Item
                  actions={[
                     <Space>លេខចូលក្រសួង {item.moj_stamp}</Space>,
                     <Space>លេខចូលខុទ្ទកាល័យ {item.office_stamp}</Space>,
                  ]}
               >
                  <List.Item.Meta
                     title={`លេខចុះ ${item.stamp_no} (${item.department?.name})`}
                     description={`ប្រភពលិខិត : ${
                        item.source != null
                           ? item.source.split("\\n").join()
                           : ""
                     }`}
                  />
                  {item.title}
               </List.Item>
            )}
         ></List>
      </div>
   );
};

export default DocumentList;
