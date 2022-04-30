import React, { useState, useContext } from "react";
import { Form, Input, Button, message, Select, Checkbox } from "antd";

import { supabase } from "supabaseClient";
import { AuthContext } from "contexts/AuthContext";

const { Option } = Select;
const { TextArea } = Input;

const FormAddDoc = ({ departments, onHandleClose }) => {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const [onStamp, setOnStamp] = useState(false);
   const userState = useContext(AuthContext);

   const onFinish = async (values) => {
      const tempData = { ...values };
      setLoading(true);
      if (onStamp) {
         const { data } = await supabase
            .from("documents")
            .select("stamp_no")
            .order("stamp_no", { ascending: false })
            .limit(1)
            .single();
         tempData.stamp_no = data.stamp_no + 1;
      }
      supabase
         .from("documents")
         .insert({ ...tempData, status: onStamp ? 2 : 1 })
         .then(({ data, error }) => {
            if (!error) {
               supabase
                  .from("documents_history")
                  .insert({
                     document: data[0].id,
                     by: userState.user.id,
                     status: onStamp ? 2 : 1,
                  })
                  .then(({ data, error }) => {
                     message.success("Document added");
                  });
            }
         })
         .finally(() => {
            form.resetFields();
            setLoading(false);
            onHandleClose();
         });
   };

   return (
      <Form
         name="basic"
         autoComplete="off"
         form={form}
         onFinish={onFinish}
         layout="vertical"
      >
         <Form.Item
            label="ខ្លឹមសារលិខិត"
            name="title"
            rules={[
               {
                  required: true,
                  message: "input title",
               },
            ]}
         >
            <TextArea></TextArea>
         </Form.Item>

         <Form.Item
            label="ប្រភពលិខិត"
            name="source"
            rules={[
               {
                  required: true,
                  message: "input source",
               },
            ]}
         >
            <Input />
         </Form.Item>

         <Form.Item
            name="moj_stamp"
            label="លេខ/កាលបរិច្ឆេទទួលចូលក្រសួងយុត្តិធម៌"
            rules={[
               {
                  required: true,
                  message: "input moj stamp",
               },
            ]}
         >
            <Input />
         </Form.Item>

         <Form.Item
            name="office_stamp"
            label="លេខ/កាលបរិច្ឆេទទួលចូលខុទ្ទកាល័យ"
            rules={[
               {
                  required: true,
                  message: "input office stamp",
               },
            ]}
         >
            <Input />
         </Form.Item>

         <Form.Item
            name="total"
            label="ចំនួន"
            rules={[
               {
                  required: true,
                  message: "input total",
               },
            ]}
         >
            <Input />
         </Form.Item>

         <Form.Item
            label="នាយកដ្ឋាន"
            name="department"
            rules={[
               {
                  required: true,
                  message: "select department",
               },
            ]}
         >
            <Select placeholder="ជ្រើសរើសនាយកដ្ឋាន">
               {departments.map((v) => {
                  return (
                     <Option value={v.id} key={v.name}>
                        {v.name}
                     </Option>
                  );
               })}
            </Select>
         </Form.Item>

         <Checkbox onChange={(e) => setOnStamp(e.target.checked)}>
            ចុះត្រាលេខចូល
         </Checkbox>

         <Form.Item className="text-center " style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
               Submit
            </Button>
         </Form.Item>
      </Form>
   );
};

export default FormAddDoc;
