import Headline from "../../../components/Headline";
import { FaServicestack, FaStar } from "react-icons/fa";
import { MdDesignServices, MdLocalOffer } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { TiUser } from "react-icons/ti";
import { LuChartNoAxesColumnIncreasing } from "react-icons/lu";
import { GrSecure } from "react-icons/gr";

const ServiceSection = () => {
  return (
    <div>
      <div className="max-w-screen-2xl mx-auto px-5 py-10">
        <Headline
          headline={"Explore Our Solutions"}
          subHeadline={
            "Discover tailored solutions to simplify your real estate journey, from property listings and advertising to expert guidance for buyers and sellers."
          }
        ></Headline>

        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {/* Card */}
            <div className="border border-base-200 p-4 rounded-xl space-y-2 transform duration-300 hover:shadow-sm">
              <div>
                <FaServicestack className="text-2xl text-primary" />
              </div>
              <h1 className="text-lg font-semibold">Property Listings</h1>
              <p className="text-sm text-gray-600">
                List your property for free or with premium features for maximum
                visibility. Reach thousands of potential buyers and renters
                effortlessly.
              </p>
            </div>

            {/* Card */}
            <div className="border border-base-200 p-4 rounded-xl space-y-2 transform duration-300 hover:shadow-sm">
              <div>
                <MdDesignServices className="text-2xl text-primary" />
              </div>
              <h1 className="text-lg font-semibold">Property Advertising</h1>
              <p className="text-sm text-gray-600">
                Boost your property’s visibility with our advanced advertising
                tools. Feature your listing and attract more buyers in less
                time.
              </p>
            </div>

            {/* Card */}
            <div className="border border-base-200 p-4 rounded-xl space-y-2 transform duration-300 hover:shadow-sm">
              <div>
                <FaStar className="text-2xl text-primary" />
              </div>
              <h1 className="text-lg font-semibold">Verified Listings</h1>
              <p className="text-sm text-gray-600">
                Gain trust with verified badges for your listings. Ensuring
                authenticity and credibility for a seamless real estate
                experience.
              </p>
            </div>

            {/* Card */}
            <div className="border border-base-200 p-4 rounded-xl space-y-2 transform duration-300 hover:shadow-sm">
              <div>
                <FiSearch className="text-2xl text-primary" />
              </div>
              <h1 className="text-lg font-semibold">
                Advanced Property Search
              </h1>
              <p className="text-sm text-gray-600">
                Use powerful filters to find properties by location, price
                range, type, size, and more. Save time and find your dream
                property quickly.
              </p>
            </div>

            {/* Card */}
            <div className="border border-base-200 p-4 rounded-xl space-y-2 transform duration-300 hover:shadow-sm">
              <div>
                <TiUser className="text-2xl text-primary" />
              </div>
              <h1 className="text-lg font-semibold">Agent Services</h1>
              <p className="text-sm text-gray-600">
                Connect with experienced real estate agents who provide
                professional guidance for buying, selling, or renting.
              </p>
            </div>

            {/* Card */}
            <div className="border border-base-200 p-4 rounded-xl space-y-2 transform duration-300 hover:shadow-sm">
              <div>
                <LuChartNoAxesColumnIncreasing className="text-2xl text-primary" />
              </div>
              <h1 className="text-lg font-semibold">Property Valuation</h1>
              <p className="text-sm text-gray-600">
                Get accurate property valuations to price your property
                competitively or to assess market value before making a
                decision.
              </p>
            </div>

            {/* Card */}
            <div className="border border-base-200 p-4 rounded-xl space-y-2 transform duration-300 hover:shadow-sm">
              <div>
                <MdLocalOffer className="text-2xl text-primary" />
              </div>
              <h1 className="text-lg font-semibold">Make an Offer</h1>
              <p className="text-sm text-gray-600">
                Easily make offers on your desired property directly from our
                platform. Stay informed about offer statuses in real-time.
              </p>
            </div>

            {/* Card */}
            <div className="border border-base-200 p-4 rounded-xl space-y-2 transform duration-300 hover:shadow-sm">
              <div>
                <GrSecure className="text-2xl text-primary" />
              </div>
              <h1 className="text-lg font-semibold">Secure Payments</h1>
              <p className="text-sm text-gray-600">
                Make payments securely through our integrated and trusted
                payment system for a hassle-free transaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
