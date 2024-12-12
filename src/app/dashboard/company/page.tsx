import React from "react";
import CompDataTable from "../../components/MasterDataTable";
import { db } from "@/lib/db";




const Dashboard = async () => {
  const [CompanyData, clients] = await db.$transaction([
    db.company.findMany(),
    db.user.findMany(),
  ]);
  

  const response = CompanyData?.map((cli) => {
    return { ...cli, clients };
  });





 
  return (
    <>
    <CompDataTable data={response} />
   

    </>
  )
}

export default Dashboard;