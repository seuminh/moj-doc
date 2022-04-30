import React, { useContext, useState } from "react";
import { Form, Input, Button, message } from "antd";

import { AuthDispatch } from "contexts/AuthContext";

import { supabase } from "supabaseClient";

const Login = () => {
   const [form] = Form.useForm();
   const authDispatch = useContext(AuthDispatch);
   const [loading, setLoading] = useState(false);

   const onFinish = async (values) => {
      setLoading(true);
      const { phoneNumber, password } = values;
      if (phoneNumber !== password) {
         setLoading(false);
         return message.error("User not found");
      }
      const { data } = await supabase
         .from("users")
         .select("*")
         .eq("phone_number", values.phoneNumber)
         .single();
      setLoading(false);
      if (!data) return message.error("User not found");
      authDispatch({
         type: "LOGIN_SUCCESS",
         payload: { user: data },
      });
   };

   return (
      <div className="h-screen flex bg-gray-bg1">
         <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
            <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
               Log in
            </h1>
            <Form
               name="basic"
               autoComplete="off"
               form={form}
               onFinish={onFinish}
               layout="vertical"
            >
               <Form.Item
                  label="Phone number"
                  name="phoneNumber"
                  rules={[
                     {
                        required: true,
                        message: "Please input your phone number!",
                     },
                  ]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                     {
                        required: true,
                        message: "Please input your password!",
                     },
                  ]}
               >
                  <Input.Password />
               </Form.Item>

               <Form.Item className="text-center">
                  <Button htmlType="submit" loading={loading}>
                     Login
                  </Button>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
};

export default Login;
