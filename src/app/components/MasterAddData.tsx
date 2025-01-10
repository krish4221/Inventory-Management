import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import FormInput from "./FormInput";
import { addUpdateMaster } from "../../action/user";
import { toast } from "../../components/ui/use-toast";
import CountryDropdown from "./Countrydropdown";
import Languagedropdown from './Languagedropdown';
import Currencydropdown from './Currencydropdown';
import ClientDropDown from './Clientdropdown';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod Validation Schema
const schema = z.object({
  name: z.string().min(1, { message: "Company Name is required" }),  // Required field
  street: z.string().min(1, { message: "Company Code is required" }), // Required field
  status: z.enum(["True", "False"], { message: "Please select a status" }), // Required field
  city: z.string().min(1, { message: "City is required" }),  // Required field
  pincode: z.string().min(1, { message: "Pincode is required" }),  // Required field
  mobileno: z.string().min(1, { message: "Mobile number is required" }),  // Required field
  email: z.string().email({ message: "Invalid email" }),  // Optional but valid email format
  pobox: z.string().optional(),
  companyPostalCode: z.string().optional(),
  telephone: z.string().optional(),
  fax: z.string().optional(),
  dataline: z.string().optional(),
  telebox: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  title: string;
  data: any;
};

const CompanyAddData = ({ title, data }: Props) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const onSubmit = async (formData: any) => {
    const response: any = await addUpdateMaster(formData, data);
    if (response?.error) {
      toast({ title: response?.error });
    } else {
      toast({ title: "Company created successfully" });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{title}</Button>
      </SheetTrigger>
      <SheetContent style={{ width: '1550px', maxWidth: '100%', maxHeight: '100vh', overflowY: 'auto' }}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <div className="w-full bg-gray-200 py-1 px-4 rounded-md shadow-md">
          <h1 className="text-xl font-bold text-gray-800 uppercase">Basic Information</h1>
        </div>

        <div className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-5 mb-3">
              <div className="grid grid-cols-3 gap-5">
                <FormInput
                  type="text"
                  name="name"
                  label="Company Name"
                  placeholder="Enter company name"
                  defaultValue={data?.name}
                  isRequired={true}
                  error={errors.name?.message}
                />
                <FormInput
                  type="text"
                  name="street"
                  label="Company Code"
                  placeholder="Enter Company Code"
                  defaultValue={data?.street}
                  isRequired={true}
                  error={errors.street?.message}
                />
                <div className="flex flex-col">
                  <Label htmlFor="status">Status</Label>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <select
                        {...field}
                        id="status"
                        className="border rounded p-2 text-sm"
                      >
                        <option value="" disabled>Select a Status</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                      </select>
                    )}
                  />
                  {errors.status && <span className="text-red-500">{errors.status.message}</span>}
                </div>

                <div className="flex flex-col">
                  <ClientDropDown />
                </div>
                <div className="flex flex-col">
                  <CountryDropdown />
                </div>
                <div className="flex flex-col">
                  <Languagedropdown />
                </div>
                <div className="flex flex-col">
                  <Currencydropdown />
                </div>

                <FormInput
                  type="text"
                  name="city"
                  label="City"
                  placeholder="Enter city name"
                  defaultValue={data?.city}
                  error={errors.city?.message}
                />
                <FormInput
                  type="text"
                  name="pincode"
                  label="Pincode"
                  placeholder="Enter postal code"
                  defaultValue={data?.pincode}
                  error={errors.pincode?.message}
                />
              </div>
            </div>

            <div className="w-full bg-gray-200 py-1 px-4 rounded-md shadow-md mb-3">
              <h1 className="text-xl font-bold text-gray-800 uppercase">PO Box Address</h1>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <FormInput
                type="text"
                name="pobox"
                label="PO Box"
                placeholder="Enter PO Box"
                defaultValue={data?.pobox}
              />
              <FormInput
                type="text"
                name="companyPostalCode"
                label="Company Postal Code"
                placeholder="Enter Company postal code"
                defaultValue={data?.companyPostalCode}
              />
            </div>

            <div className="w-full bg-gray-200 py-1 px-4 rounded-md shadow-md mb-3">
              <h1 className="text-xl font-bold text-gray-800 uppercase">Communication</h1>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <FormInput
                type="text"
                name="telephone"
                label="Telephone"
                placeholder="Enter telephone number"
                defaultValue={data?.telephone}
              />
              <FormInput
                type="text"
                name="mobileno"
                label="Mobile Phone"
                placeholder="Enter mobile number"
                defaultValue={data?.mobileno}
                isRequired={true}
                error={errors.mobileno?.message}
              />
              <FormInput
                type="text"
                name="fax"
                label="Fax"
                placeholder="Enter fax number"
                defaultValue={data?.fax}
              />
              <FormInput
                type="email"
                name="email"
                label="Email"
                placeholder="Enter email"
                defaultValue={data?.email}
                isRequired={true}
                error={errors.email?.message}
              />
              <FormInput
                type="text"
                name="dataline"
                label="Dataline"
                placeholder="Enter dataline"
                defaultValue={data?.dataline}
              />
              <FormInput
                type="text"
                name="telebox"
                label="TeleBox"
                placeholder="Enter telebox"
                defaultValue={data?.telebox}
              />
            </div>

            <Button type="submit" className="mt-5">
              {title}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CompanyAddData;
