/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { topBarConstants } from "../../constants/common";
import { useGetCountriesQuery } from "../../services/countries";
import { routes } from "../../routes/routes";
import { updateScrollPosition } from "../../store/country";
import TopBar from "../../components/TopBar";
import CountryCard from "./components/CountryCard";

const Country = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentRef = useRef(null);

  const { scrollPosition } = useSelector((state) => state.country);

  useEffect(() => {
    currentRef.current.scrollTop = scrollPosition;
  }, []);

  const compare = (a, b) => {
    if (a.name.common < b.name.common) return -1;
    if (a.name.common > b.name.common) return 1;
    return 0;
  };

  const handleCountryClick = (name) => {
    navigate(`${routes.COUNTRY_LIST}/${name}`);
    dispatch(updateScrollPosition({ currentPosition: currentRef.current.scrollTop }));
  };

  const { data: countries } = useGetCountriesQuery();
  const sortedCountries = countries ? [...countries].sort(compare) : [];

  return (
    <div className="w-full h-full">
      <TopBar headerText={topBarConstants.COUNTRY_LIST} />
      <div
        className="w-full h-[calc(100vh-93px)] flex justify-center p-4 bg-harp overflow-y-auto sm:p-10 "
        ref={currentRef}
      >
        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-10 lg:gap-x-10">
          {sortedCountries?.map((country) => (
            <CountryCard
              key={country.name.common}
              flag={country.flags.png}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
              handleCountryClick={() => handleCountryClick(country.name.common)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Country;
