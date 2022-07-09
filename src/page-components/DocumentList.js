import React, { useState, useEffect } from "react";

import { List, Avatar, Space, Table } from "antd";
import { Link } from "react-router-dom";

import FilterOption from "./FilterOption";

import { supabase } from "supabaseClient";

const DocumentList = ({ departments }) => {
   const [documents, setDocuments] = useState(null);
   const [filterDoc, setFilterDoc] = useState(null);

   const fetchDocument = async () => {
      const { data } = await supabase
         .from("documents")
         .select(
            `id,
        title,
        documents_history(status, by, to, created_at),
        department(name),
        stamp_no,source,moj_stamp,office_stamp,created_at`
         )
         .order("created_at", {
            foreignTable: "documents_history",
            ascending: false,
         })
         .limit(1, { foreignTable: "documents_history" })
         .order("id", { ascending: false });

      setDocuments(data);
      setFilterDoc(data);
   };

   const columns = [
      {
         title: "លេខចុះ",
         dataIndex: "stamp_no",
         key: "stamp_no",
         width: 100,
      },
      {
         title: "ប្រភពលិខិត",
         dataIndex: "source",
         key: "source",
      },
      {
         title: "កម្មវត្ថុ",
         dataIndex: "title",
         key: "title",
         render: (text) => (
            <span>
               {text
                  ? text.length > 150
                     ? text.slice(0, 150) + "......."
                     : text.slice(0, 150)
                  : ""}
            </span>
         ),
      },
      {
         title: "Department",
         dataIndex: ["department", "name"],
         key: ["department", "name"],
         width: 200,
      },
      {
         title: "Action",
         key: "action",
         render: (text, record) => {
            return (
               <>
                  <Link
                     to={`/doc/${record.stamp_no}`}
                     state={{ data: record }}
                     style={{
                        marginRight: 10,
                     }}
                  >
                     More..
                  </Link>
               </>
            );
         },
      },
   ];

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

   const onFilterOption = (filterData) => {
      setFilterDoc(filterData);
   };

   useEffect(() => {
      setFilterDoc(documents);
   }, [documents]);

   if (!documents) {
      return (
         <div>
            <p>Loading</p>
         </div>
      );
   }

   return (
      <div>
         <FilterOption
            filterData={documents}
            onHandleFilter={onFilterOption}
            departments={departments}
         ></FilterOption>

         <Table columns={columns} dataSource={filterDoc} rowKey="stamp_no" />

         {/* <List
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
         ></List> */}
      </div>
   );
};

export default DocumentList;
