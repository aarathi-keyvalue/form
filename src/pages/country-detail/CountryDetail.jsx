import { useParams } from "react-router";
import { useGetCountryByNameQuery } from "../../services/countries";
import TopBar from "../../components/TopBar";
import { topBarConstants } from "../../constants/common";

const CountryDetail = () => {
  const { country } = useParams();
  const { data: countryDetails } = useGetCountryByNameQuery({ name: country });
  return (
    <div className="w-full h-full">
      <TopBar headerText={topBarConstants.COUNTRY_DETAILS} />
      <div className="w-full h-[calc(100vh-93px)] flex justify-center p-4 bg-harp overflow-y-auto sm:p-10">
        <div className="w-full h-full p-4 bg-white rounded-sm"></div>
      </div>
    </div>
  );
};

export default CountryDetail;
