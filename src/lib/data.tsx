import { LayoutDashboard, User } from "lucide-react";

export const sidebar = [
  { title: "inventory", link: "/dashboard/inventory", icon: <LayoutDashboard /> },
  { title: "user", link: "/dashboard/clients", icon: <User /> },
  
  
  { title: "Clients", link: "/dashboard", icon: <LayoutDashboard /> },
  { title: "Company", link: "/dashboard/company", icon: <LayoutDashboard /> },
  { title: "Plant", link: "/dashboard/plant", icon: <LayoutDashboard /> },
  // { title: "user info", link: "/dashboard/userinfo", icon: <User /> },
  // { title: "Download", link: "/dashboard/download", icon: <User /> },
];
