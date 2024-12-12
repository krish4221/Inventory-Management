import React from 'react'
import { db } from "@/lib/db";
import ClientCompany from './ClientCompany';
import ClientInventory from './ClientInventory';
import ClientMaster from './ClientMaster'

const ClientComp = async ({ user }: any) => {
    const clients = await db.user.findMany({
      where: {
        NOT: {
          id: user?.id,
        },
        isAdmin: false,
      },
    });
  
    const response = {
      ...user,
      Client : user?.Client.map((cli: any) => {
        return { ...cli, clients };
      }),
    };

    const res = {
        ...user,
        Inventory: user?.Inventory?.map((inven: any) => {
          return { ...inven, clients };
        }),
      };
      const ress = {
        ...user,
        Company: user?.Inventory?.map((cmp: any) => {
          return { ...cmp, clients };
        }),
      };
  return (
    <div>
      <ClientCompany user={response}/>
      <ClientInventory user={res} />
      <ClientMaster user={ress}/>
    </div>
  )
}

export default ClientComp
