import { useState, useEffect } from "react";


interface Country {
  _id: string;
  name: string;
  code: string;
}

const CountryDropdown = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  

  useEffect(() => {
    const fetchCountries = async () => {
      
      try {
        const response = await fetch('/api/countries');

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
        Country<span className="text-red-500 ml-1">*</span>
      </label>
      <select
        id="country"
        name="country"
        defaultValue=""
        className="border rounded p-2 text-sm"
        
      >
        <option value="" disabled>
         Select a country
        </option>
        {countries.map((country) => (
          <option key={country._id} value={country.code}>
            {country.name} ({country.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
