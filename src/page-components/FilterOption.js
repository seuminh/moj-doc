import React, { useEffect, useState } from "react";
import { Form, Radio, Select, Col, Row, Input } from "antd";

import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const FilterOption = ({ filterData, onHandleFilter, departments }) => {
   const [searchText, setSearchText] = useState("");
   const [department, setDepartment] = useState("all");

   const filterSearch = (filterData) => {
      if (searchText === "") return filterData;
      else
         return filterData.filter((d) => {
            return (
               d.stamp_no?.toString().search(searchText.toLowerCase()) !== -1 ||
               d.title?.toLowerCase().search(searchText.toLowerCase()) !== -1
            );
         });
   };

   const filterDepartment = (filterData) => {
      if (department === "all") return filterData;
      else
         return filterData?.filter((v) => {
            if (v.department !== null) return v.department.name === department;
         });
   };

   useEffect(() => {
      let result = filterData;
      result = filterSearch(result);
      result = filterDepartment(result);

      onHandleFilter(result);
   }, [searchText, department]);

   return (
      <Form
         name="sort-option"
         initialValues={{
            department,
         }}
      >
         <Row gutter={16}>
            <Col span={12}>
               <Input
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  className="mb-2"
                  onChange={(e) => setSearchText(e.target.value)}
               />
            </Col>
            <Col span={6}>
               <Form.Item label="Department" name="workPlace">
                  <Select
                     placeholder="Select department"
                     onChange={(v) => setDepartment(v)}
                  >
                     {departments?.map((v) => {
                        return (
                           <Option key={v.name} value={v.name}>
                              {v.name}
                           </Option>
                        );
                     })}
                     <Option value="all">ទាំងអស់</Option>
                  </Select>
               </Form.Item>
            </Col>
         </Row>
      </Form>
   );
};

export default FilterOption;
