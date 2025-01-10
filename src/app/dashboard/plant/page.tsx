import React from "react";
import PlantDataTable from "../../components/PlantDataTable";
import { db } from "@/lib/db";




const Dashboard = async () => {
  const [CompanyData, clients] = await db.$transaction([
    db.plant.findMany(),
    db.user.findMany(),
  ]);
  

  const response = CompanyData?.map((cli) => {
    return { ...cli, clients };
  });





 
  return (
    <>
    <PlantDataTable data={response} />
   

    </>
  )
}

export default Dashboard;