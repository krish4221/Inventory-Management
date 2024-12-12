import { useState, useEffect } from "react";


interface Country {
  _id: string;
  name: string;
  
}

const CountryDropdown = () => {
  const [countries, setCountries] = useState<Country[]>([]);


  useEffect(() => {
    const fetchCountries = async () => {
   
      try {
        const response = await fetch('/api/client');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Country[] = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="flex flex-col">
      <label htmlFor="country" className="mb-2">
        Clients<span className="text-red-500 ml-1">*</span>
      </label>
      <select
        id="country"
        name="country"
        defaultValue=""
        className="border rounded p-2 text-sm"
        
      >
        <option value="" disabled>
          Select a Client
        </option>
        {countries.map((country) => (
          <option key={country._id} >
            {country.name} 
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
