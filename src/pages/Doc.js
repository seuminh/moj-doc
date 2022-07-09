import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const Doc = () => {
   const location = useLocation();
   const navigate = useNavigate();

   if (location.state === null) {
      return (
         <div className="md:w-4/5 md:mx-auto p-5">
            <p>Loading</p>
         </div>
      );
   }

   const data = location.state.data;
   console.log(data);

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
            </dl>
         </div>
      </div>
   );
};

export default Doc;
