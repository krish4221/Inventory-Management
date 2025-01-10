export type CompanyProps = {
    title: string;
    street:string;
    action: any;
    btnTitle: string;
    data?: any;
    add?: string;
    selectedId?: any;
  };
  
  export type deleteBtnProps = {
    title: string;
    handleDelete: any;
  };
  
  export type CompanyDataProps = {
    id: string;
    name: string;
    street:string;
    city:string;
    pobox:string;
    status:boolean;
    pincode:number;
    lifeSpan: number;
    createdAt: Date;
    updatedAt: Date | null;
  }[];



  export type InventoryProps = {
    title: string;
    description: string;
    action: any;
    btnTitle: string;
    data?: any;
    add?: string;
    selectedId?: any;
  };





  export type InventoryDataProps = {
    id: string;
    name: string;
    description: string;
    cost: number;
    lifeSpan: number;
    createdAt: Date;
    updatedAt: Date | null;
  }[];


  export type CompDataProps = {
    id: string;
    name: string;
    street:string;
    city:string;
    pobox:string;
    telephone:string;
    mobileno:number;
    fax:string;
    email:string;
    dataline:string;
    comments:string
    pincode:number;
    lifeSpan: number;
    createdAt: Date;
    updatedAt: Date | null;
  }[];


  export type PlantDataProps = {
    id: string;
    name: string;
    name1:string;
    street:string;
    city:string;
    pobox:string;
    region:string;
    tax:string;
    factory:string;
    pincode:number;
    lifeSpan: number;
    createdAt: Date;
    updatedAt: Date | null;
  }[];