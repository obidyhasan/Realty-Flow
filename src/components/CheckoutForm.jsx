import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../hooks/useAuth";
import { showErrorToast, showSuccessToast } from "../utility/ShowToast";

const CheckoutForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [clientSecret, setClientSecret] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { data: property = {} } = useQuery({
    queryKey: ["checkout", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/makeOffer/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (property.offerAmount > 0) {
      axiosSecure
        .post("/api/create-payment-intent", { price: property?.offerAmount })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, property]);

  async function handelPaySubmit(e) {
    setLoadingBtn(true);
    e.preventDefault();
    if (!stripe || !elements) {
      setLoadingBtn(false);
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      setLoadingBtn(false);
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setLoadingBtn(false);
      console.log("Payment error", error);
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
    }

    const { paymentIntent, error: confirmPayError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmPayError) {
      setLoadingBtn(false);
      showErrorToast(error.message);
      console.log("confirm pay error: ", confirmPayError);
    } else {
      setLoadingBtn(false);
      if (paymentIntent.status === "succeeded") {
        const updateInfo = {
          status: "Bought",
          transactionId: paymentIntent.id,
        };

        axiosSecure
          .patch(`/api/makeOffer/payment/${id}`, updateInfo)
          .then((res) => {
            if (res.data.modifiedCount) {
              showSuccessToast("Payment successfully");
              setLoadingBtn(false);
              navigate("/dashboard/user/property-bought", { replace: true });
            }
          })
          .catch((error) => {
            console.log(error);
            showErrorToast(error.message);
          });
      }
    }
  }

  return (
    <div>
      <div className="max-w-xl mx-auto text-center">
        <form className="flex flex-col" onSubmit={handelPaySubmit}>
          <CardElement
            className="border p-4 rounded-lg"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          ></CardElement>
          <label className="label text-red-500 ">{errorMessage}</label>
          <button
            disabled={!stripe || !clientSecret}
            className="btn mt-4 px-10 bg-primary hover:bg-primary-light border-none disabled:bg-primary disabled:text-dark-01"
          >
            {loadingBtn ? (
              <>
                <span className="loading loading-spinner"></span> Pay
              </>
            ) : (
              "Pay"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
