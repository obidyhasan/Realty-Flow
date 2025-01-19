import { Helmet } from "react-helmet";
import PropertyCard from "../../../components/PropertyCard";
import TitleSection from "../../../components/TitleSection";
import useMyProperties from "../../../hooks/useMyProperties";

const AgentAddedProperties = () => {
  const [properties, isPending] = useMyProperties();

  return (
    <div>
      <Helmet>
        <title>Realty Flow - Added Properties</title>
      </Helmet>
      <div className="my-5">
        <TitleSection
          title={"Manage Your Properties"}
          description={
            "View and manage the properties you’ve added. Update details, check statuses, and stay in control of your listings."
          }
        ></TitleSection>
      </div>
      <div className="my-10">
        {isPending ? (
          <div className="my-10 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div>
            {properties.length ? (
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    fromAgent={true}
                  ></PropertyCard>
                ))}
              </div>
            ) : (
              <div className="text-center font-semibold text-xl border p-4 rounded-md border-base-200">
                <h1>Properties Not Found</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentAddedProperties;
