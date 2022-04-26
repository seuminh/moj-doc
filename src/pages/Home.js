import React, { useEffect, useState } from "react";

import { Modal, Button } from "antd";

import DocumentList from "page-components/DocumentList";
import FormAddDoc from "page-components/FormAddDoc";

import { supabase } from "supabaseClient";

const Home = () => {
   const [modalAdd, setModalAdd] = useState(false);
   const [departments, setDepartments] = useState(null);

   const fetchDepartment = async () => {
      const { data } = await supabase
         .from("departments")
         .select(`id, name`)
         .order("id");

      setDepartments(data);
   };

   useEffect(() => {
      fetchDepartment();
   }, []);

   const onCloseModal = () => {
      setModalAdd(false);
   };

   return (
      <div className="md:w-4/5 md:mx-auto p-5">
         <Button onClick={() => setModalAdd(true)} className="my-3">
            Add document
         </Button>

         <DocumentList></DocumentList>

         <Modal
            visible={modalAdd}
            title="Add Doc"
            footer={null}
            onCancel={onCloseModal}
         >
            <FormAddDoc
               departments={departments}
               onHandleClose={onCloseModal}
            ></FormAddDoc>
         </Modal>
      </div>
   );
};

export default Home;
