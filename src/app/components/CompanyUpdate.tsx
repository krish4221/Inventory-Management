import React from "react";
import CompanyData from "./CompanyAddData ";
import { CompanyDelete } from "./CompanyDelete";

const CompanyUpdate = ({ row }: any) => {
  const data = row.original;
  return (
    <div className="flex gap-5">
      <CompanyData title="Update Client" data={data} />
      <CompanyDelete data={data} />
    </div>
  );
};

export default CompanyUpdate;
