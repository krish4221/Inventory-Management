"use server"
import { db } from "@/lib/db";
import { z } from "zod";
import { auth, signIn } from "../../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export const loginSignup = async (formData: FormData, isLogin: boolean) => {

  

  
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    
  
    const user = await db.user.findUnique({
      where: { email },
      select: { isAdmin: true },
    });
  
    const res = await signIn("credentials", {
      name,
      email,
      password,
      isLogin,
      redirect: true,
      callbackUrl: "/",
    })
      .then(() => {
        redirect("/");
      })
      .catch((err) => {
        if (err?.toString() == "Error: NEXT_REDIRECT") {
          user?.isAdmin ? redirect("/dashboard") : redirect("/");
        } else return { error: err?.type };
      });
  
    if (!isLogin && res?.error) {
      return { error: "credentials already exists" };
    } else {
      return { error: "wrong credentials" };
    }
  };



  export const updateUser = async (
    id: string,
    userId: string,
    isAdmin: boolean
  ) => {
    let company;
    try {
      company = await db.client.update({
        where: { id },
        data: { userId },
      });
  
      if (!company) {
        return { error: "failed to transfer" };
      }
    } catch (error) {
      return { error: "failed to transfer" };
    }
  
    revalidatePath(`${isAdmin ? "/dashboard" : "/"}`);
    return company;
  };



  export const updateUserRole = async (
    formData: FormData,
    isAdmin: boolean,
    data: any
  ) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    if (!name || !email || !password) {
      return { error: "All fields are required" };
    }
    const checkEmail = await db.user.findUnique({ where: { email } });
    if (!checkEmail) return { error: "User not found" };
  
    let user;
    try {
      user = await db.user.update({
        where: { id: data?.id },
        data: { name, email, password, isAdmin },
      });
      console.log(user, "user");
      if (!user) {
        return { error: "User not udpated" };
      }
    } catch (error) {
      return { error: "User not udpated" };
    }
  
    revalidatePath(`/dashboard/clients`);
    return user;
  };


  export const addUpdateCompany = async (formData: FormData, data: any) => {
    const session = await auth();
  
    const name = formData.get("name") as string;
    const street = formData.get("street") as string;
    const city = formData.get("city") as string;
    const pobox = formData.get("pobox") as string;
    const pincode = parseInt(formData.get("pincode") as string, 10);
    const status = formData.get("status") === "true";
  
    const user = await db.user.findUnique({
      where: { email: session?.user?.email! }, 
    });
  
    if (!name || !street || !city || !pobox || !pincode || !status ) {
      return { error: "All fields are required" };
    }
  
    let company;
    try {
      if (data?.id) {
        company = await db.client.update({
          where: { id: data?.id },
          data: { name, street, city,pobox,pincode,status, userId: user?.id },
        });
      } else {
        company = await db.client.create({
          data: { name, street,city,pobox,pincode,status, userId: user?.id },
        });
      }
      if (!company) {
        return { error: "failed to create company" };
      }
    } catch (error) {
      return { error: "failed to create company" };
    }
  
    revalidatePath(`/dashboard`);
    return company;
  };

  export const DeleteCompany = async (id: string) => {
    try {
      const result = await db.client.delete({
        where: { id },
      });
      revalidatePath("/dashboard");
      if (!result) {
        return { error: "company not deleted" };
      }
    } catch (error) {
      return { error: "Company not deleted" };
    }
  };














  export const updateInvUser = async (
    id: string,
    userId: string,
    isAdmin: boolean
  ) => {
    let inventory;
    try {
      inventory = await db.inventory.update({
        where: { id },
        data: { userId },
      });
  
      if (!inventory) {
        return { error: "failed to transfer" };
      }
    } catch (error) {
      return { error: "failed to transfer" };
    }
  
    revalidatePath(`${isAdmin ? "/dashboard" : "/"}`);
    return inventory;
  };



  export const addUpdateInventory = async (formData: FormData, data: any) => {
    const session = await auth();
  
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const getCost = formData.get("cost") as string;
    const cost = Number(getCost);
  
    const user = await db.user.findUnique({
      where: { email: session?.user?.email! },
    });
  
    if (!name || !description || !cost) {
      return { error: "All fields are required" };
    }
  
    let inventory;
    try {
      if (data?.id) {
        inventory = await db.inventory.update({
          where: { id: data?.id },
          data: { name, description, cost, userId: user?.id },
        });
      } else {
        inventory = await db.inventory.create({
          data: { name, description, cost, userId: user?.id },
        });
      }
      if (!inventory) {
        return { error: "failed to create inventory" };
      }
    } catch (error) {
      return { error: "failed to create inventory" };
    }
  
    revalidatePath(`/dashboard`);
    return inventory;
  };

















  export const addUpdateMaster = async (formData: FormData, data: any) => {
    const session = await auth();
  
   
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const mobileno = parseInt(formData.get("mobileno") as string, 10);
    const email = formData.get("email") as string;
  
    
    if (!name || !mobileno || isNaN(mobileno) || !city || !email) {
      return { error: "All fields are required and mobileno must be a valid number." };
    }
  
    
    const user = await db.user.findUnique({
      where: { email: session?.user?.email || "" },
    });
  
   
    const userId = user?.id || null;
  
    
    const defaultData = {
      street: "",
      pobox: "",
      telephone: "",
      fax: "",
      dataline: "",
      telebox: "",
      comments: "",
      status: true,
      pincode: 0,
    };
  
    try {
      let company;
      if (data?.id) {
       
        company = await db.company.update({
          where: { id: data.id },
          data: {
            name,
            city,
            email,
            mobileno,
            userId,
            ...defaultData, 
          },
        });
      } else {
       
        company = await db.company.create({
          data: {
            name,
            city,
            email,
            mobileno,
            userId,
            ...defaultData, 
          },
        });
      }
  
      if (!company) {
        return { error: "Failed to save company data." };
      }
  
      
      revalidatePath(`/dashboard`);
  
      return company;
    } catch (error) {
      console.error("Error saving company:", error);
      return { error: "An error occurred while saving the company data." };
    }
  };
  
