import { topBarConstants } from "../../constants/common";
import { useGetCountriesQuery } from "../../services/countries";
import TopBar from "../../components/TopBar";
import CountryCard from "./components/CountryCard";

const Country = () => {
  const compare = (a, b) => {
    if (a.name.common < b.name.common) return -1;
    if (a.name.common > b.name.common) return 1;
    return 0;
  };

  const { data: countries } = useGetCountriesQuery();
  const sortedCountries = countries ? [...countries].sort(compare) : [];
  return (
    <div className="w-full h-full">
      <TopBar headerText={topBarConstants.COUNTRY_LIST} />
      <div className="w-full h-[calc(100vh-100px)] flex justify-center p-4 bg-harp overflow-y-auto sm:p-10">
        <div className="grid grid-cols-4 gap-x-4 gap-y-4 lg:gap-x-10 lg:gap-y-10">
          {sortedCountries?.map((country) => (
            <CountryCard
              key={country.cioc}
              flag={country.flags.png}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Country;
