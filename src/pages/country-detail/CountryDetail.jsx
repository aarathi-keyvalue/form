import { useNavigate, useParams } from "react-router";

import { useGetCountryByNameQuery } from "../../services/countries";
import { topBarConstants } from "../../constants/common";
import { routes } from "../../routes/routes";
import TopBar from "../../components/TopBar";

const CountryDetail = () => {
  const { country } = useParams();
  const { data: countryDetails, isFetching } = useGetCountryByNameQuery({
    name: country,
  });

  const navigate = useNavigate();

  const fieldStyle = "flex gap-x-2";
  const attributeStyle = "font-medium text-base";
  const valueStyle = "font-light text-base";

  const getCurrencies = () => {
    let currencies = "";
    for (const key in countryDetails?.[0].currencies) {
      if (currencies === "")
        currencies += countryDetails?.[0].currencies[key].name;
      else currencies += " " + countryDetails?.[0].currencies[key].name;
    }
    return currencies;
  };

  const getLanguages = () => {
    let formattedValue = "";
    for (const key in countryDetails?.[0].languages) {
      if (formattedValue === "")
        formattedValue += countryDetails?.[0].languages[key];
      else formattedValue += ", " + countryDetails?.[0].languages[key];
    }
    return formattedValue;
  };

  return (
    <div className="w-full h-full">
      <TopBar
        headerText={topBarConstants.COUNTRY_DETAILS}
        showNavigateBack
        handleBackClick={() => navigate(routes.COUNTRY_LIST)}
      />
      <div className="w-full h-[calc(100vh-93px)] flex justify-center p-4 bg-harp overflow-y-auto sm:p-10">
        <div className="w-full h-full p-4 bg-white rounded-md flex items-start gap-x-10 sm:p-12">
          {!isFetching && (
            <>
              <div className="w-96 h-80 border rounded-md shadow-md">
                <img
                  src={countryDetails?.[0].flags.png}
                  alt={countryDetails?.[0].name.common}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-y-2 p-10">
                <div className="text-3xl font-medium mb-3">
                  {countryDetails?.[0].name.common}
                </div>
                <div className={fieldStyle}>
                  <div className={attributeStyle}>Region:</div>
                  <div className={valueStyle}>{countryDetails?.[0].region}</div>
                </div>
                <div className={fieldStyle}>
                  <div className={attributeStyle}>Subregion:</div>
                  <div className={valueStyle}>
                    {countryDetails?.[0].subregion}
                  </div>
                </div>
                <div className={fieldStyle}>
                  <div className={attributeStyle}>Capital:</div>
                  <div className={valueStyle}>
                    {countryDetails?.[0].capital[0]}
                  </div>
                </div>
                <div className={fieldStyle}>
                  <div className={attributeStyle}>Population:</div>
                  <div className={valueStyle}>
                    {countryDetails?.[0].population}
                  </div>
                </div>
                <div className={fieldStyle}>
                  <div className={attributeStyle}>Currency:</div>
                  <div className={valueStyle}>{getCurrencies()}</div>
                </div>
                <div className={fieldStyle}>
                  <div className={attributeStyle}>Language:</div>
                  <div className={valueStyle}>{getLanguages()}</div>
                </div>
                <div className={fieldStyle}>
                  <div className={attributeStyle}>Population:</div>
                  <div className={valueStyle}>
                    {countryDetails?.[0].population}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
