import React from "react";

import { db } from "@/lib/db";
import DashboardDataTable from '../../components/DashboardDataTable'



const Dashboard = async () => {
  



  const [inventoryData, client] = await db.$transaction([
    db.inventory.findMany(),
    db.user.findMany(),
  ]);

  const res = inventoryData?.map((inv) => {
    return { ...inv, client };
  });




 
  return (
    <>
    
    <DashboardDataTable data={res} />

    </>
  )
}

export default Dashboard;