import { useState } from "react";
import PersonalInfoForm from "./components/PersonalInfoForm";
import OrderSummary from "./components/OrderSummary";
import AddressForm from "./components/AddressForm";
import PaymentForm from "./components/PaymentForm";
import ReviewOrder from "./components/ReviewOrder";
import SuccessPage from "./components/SuccessPage";
import Stepper from "./components/Stepper";

function App() {
  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState({
    personalInfo: {},
    addressInfo: {},
    paymentInfo: {},
  });

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Checkout
        </h1>
        <Stepper step={step} />
        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            {step === 1 ? (
              <PersonalInfoForm
  onNext={() => setStep(2)}
  saveData={(data) =>
    setCheckoutData((prev) => ({
      ...prev,
      personalInfo: data,
    }))
  }
  defaultValues={checkoutData.personalInfo}
/>
            ) : step === 2 ? (
              <AddressForm
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
                saveData={(data) =>
                  setCheckoutData((prev) => ({
                    ...prev,
                    addressInfo: data,
                  }))
                }
                defaultValues={checkoutData.addressInfo}
              />
            ) : step === 3 ? (
              <PaymentForm
                onBack={() => setStep(2)}
                onNext={() => setStep(4)}
                saveData={(data) =>
                  setCheckoutData((prev) => ({
                    ...prev,
                    paymentInfo: data,
                  }))
                }
                defaultValues={checkoutData.paymentInfo}
              />
            ) : step === 4 ? (
              <ReviewOrder
                checkoutData={checkoutData}
                onBack={() => setStep(3)}
                onPlaceOrder={() => setStep(5)}
              />
            ) : (
              <SuccessPage />
            )}

          </section>

          <OrderSummary />
        </div>
      </div>
    </main>
  );
}

export default App;