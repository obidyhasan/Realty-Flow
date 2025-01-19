import { Elements } from "@stripe/react-stripe-js";
import TitleSection from "../../../components/TitleSection";
import CheckoutForm from "../../../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const UserCheckout = () => {
  return (
    <div>
      <Helmet>
        <title>Realty Flow - Checkout</title>
      </Helmet>
      <div className="my-5">
        <TitleSection
          title={"Checkout"}
          description={"Quickly review and complete your purchase securely."}
        ></TitleSection>
      </div>
      <div className="my-10">
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default UserCheckout;
