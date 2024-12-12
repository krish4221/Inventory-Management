import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FormInput from "./FormInput";
import { addUpdateCompany } from "../../action/user";
import { toast } from "../../components/ui/use-toast";
import CountryDropdown from "./Countrydropdown";
import Languagedropdown from './Languagedropdown'
import Currencydropdown from './Currencydropdown'

type Props = {
  title: string;
  data: any;
};
const CompanyAddData = ({ title, data }: Props) => {
  const handleSubmit = async (formData: FormData) => {
    const response: any = await addUpdateCompany(formData, data);
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
  <SheetContent style={{ width: '800px', maxWidth: '90%' }}> 
    <SheetHeader>
      <SheetTitle>{title}</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <form action={handleSubmit}>
        <div className="flex flex-col gap-2 mt-5">
          <div className="grid grid-cols-2 gap-5 "> 
            <FormInput
              type="text"
              name="name"
              label="Company Name"
              placeholder="Enter company name"
              defaultValue={data?.name}
              
            />
            <FormInput
              type="text"
              name="street"
              label="Street"
              placeholder="Enter street name"
              defaultValue={data?.street}
            />
            <FormInput
              type="text"
              name="city"
              label="City"
              placeholder="Enter city name"
              defaultValue={data?.city}
            />
            <FormInput
              type="text"
              name="pobox"
              label="PoBox"
              placeholder="Enter PO box"
              defaultValue={data?.pobox}
            />
            <FormInput
              type="number"
              name="pincode"
              label="Postal Code"
              placeholder="Enter postal code"
              defaultValue={data?.pincode}
            />
            <FormInput
              type="boolean"
              name="status"
              label="Status"
              placeholder="enter active status"
              defaultValue={data?.status}
            />
            <div className="flex flex-col">
              
            <CountryDropdown/>
            </div>
            <div className="flex flex-col">
              <Languagedropdown/>
            </div>
            <div className="flex flex-col">
              <Currencydropdown/>
            </div>
          </div>
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
