import React from "react";
import CompanyDataTable from "../components/CompanyDataTable";
import { db } from "@/lib/db";




const Dashboard = async () => {
  const [CompanyData, clients] = await db.$transaction([
    db.client.findMany(),
    db.user.findMany(),
  ]);
  

  const response = CompanyData?.map((cli) => {
    return { ...cli, clients };
  });





 
  return (
    <>
    <CompanyDataTable data={response} />
   

    </>
  )
}

export default Dashboard;