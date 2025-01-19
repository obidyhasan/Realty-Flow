import Headline from "../../../components/Headline";
import faqIcon from "../../../assets/faq-icon.svg";

const FAQSection = () => {
  return (
    <div>
      <div className="max-w-screen-2xl mx-auto px-5 py-16">
        <Headline
          headline={"Frequently Asked Questions"}
          subHeadline={
            "The FAQs section provides clear and concise answers to common questions about using the RealtyFlow platform."
          }
        ></Headline>

        <div className="mt-16 flex lg:flex-row flex-col gap-10 lg:gap-5 ">
          <div className="sm:w-1/3 mx-auto flex items-end justify-center">
            <img src={faqIcon} alt="" />
          </div>
          <div className="lg:w-2/3 space-y-3">
            <div className="collapse collapse-plus border border-base-200 rounded-lg">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-lg font-semibold">
                What is RealtyFlow?
              </div>
              <div className="collapse-content">
                <p className="text-sm">
                  RealtyFlow is an all-in-one real estate platform where buyers,
                  sellers, and agents can connect to explore properties,
                  advertise listings, and manage transactions efficiently.
                </p>
              </div>
            </div>
            {/*  */}
            <div className="collapse collapse-plus border border-base-200 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-semibold">
                How do I search for properties in a specific location?
              </div>
              <div className="collapse-content">
                <p className="text-sm">
                  Use the search bar on the homepage, enter your desired
                  location, and apply filters like price range, property type,
                  and size to refine your search.
                </p>
              </div>
            </div>
            {/*  */}
            <div className="collapse collapse-plus border border-base-200 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-semibold">
                How do I list my property on RealtyFlow?
              </div>
              <div className="collapse-content">
                <p className="text-sm">{`Sign up or log in to your account, go to the "Advertise Property" section, and follow the steps to upload details, images, and pricing.`}</p>
              </div>
            </div>
            {/*  */}
            <div className="collapse collapse-plus border border-base-200 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-semibold">
                What are the benefits of advertising my property on RealtyFlow?
              </div>
              <div className="collapse-content">
                <p className="text-sm">{`Advertising increases your property's visibility to a large audience of potential buyers, helping you sell faster.`}</p>
              </div>
            </div>
            {/*  */}
            <div className="collapse collapse-plus border border-base-200 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-semibold">
                How are payments handled on RealtyFlow?
              </div>
              <div className="collapse-content">
                <p className="text-sm">
                  Payments are securely processed through our integrated payment
                  system to ensure safe transactions.
                </p>
              </div>
            </div>
            {/*  */}
            <div className="collapse collapse-plus border border-base-200 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-semibold">
                Are there any hidden fees?
              </div>
              <div className="collapse-content">
                <p className="text-sm">
                  RealtyFlow is transparent with fees. Any applicable charges
                  will be clearly mentioned before you make a transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
