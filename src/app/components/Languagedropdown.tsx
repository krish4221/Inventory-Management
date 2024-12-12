import { useState, useEffect } from "react";

// Define the Country type
interface Country {
  _id: string;
  name: string;
  code: string;
}

const CountryDropdown = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      // setLoading(true);
      try {
        const response = await fetch('/api/languages');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Country[] = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="flex flex-col">
      <label htmlFor="country" className="mb-2">
        Language<span className="text-red-500 ml-1">*</span>
      </label>
      <select
        id="country"
        name="country"
        defaultValue=""
        className="border rounded p-2 text-sm"
       
      >
        <option value="" disabled>
          Select a Language
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
