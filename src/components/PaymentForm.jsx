import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaCcDiscover,
} from "react-icons/fa";

function PaymentForm({ onNext, saveData, onBack, defaultValues }) {
    const [paymentMethod, setPaymentMethod] = useState("card");

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            cardholderName: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
        },
    });
    const cardNumber = watch("cardNumber") || "";
    const expiryDate = watch("expiryDate") || "";
    const cardType = getCardType(cardNumber);

    function getCardType(number) {
        const cleaned = number.replace(/\s/g, "");

        if (/^4/.test(cleaned)) return "visa";
        if (/^5[1-5]/.test(cleaned)) return "mastercard";
        if (/^3[47]/.test(cleaned)) return "amex";
        if (/^6(?:011|5)/.test(cleaned)) return "discover";

        return "";
    }

    function getCardIcon(type) {
        switch (type) {
            case "visa":
                return <FaCcVisa size={32} />;

            case "mastercard":
                return <FaCcMastercard size={32} />;

            case "amex":
                return <FaCcAmex size={32} />;

            case "discover":
                return <FaCcDiscover size={32} />;

            default:
                return null;
        }
    }

    const [isRedirecting, setIsRedirecting] = useState(false);

    const handlePaypalCheckout = () => {
        setIsRedirecting(true);

        setTimeout(() => {
            onNext();
        }, 2000);
    };

    function isValidExpiryDate(value) {
        if (!/^\d{2}\/\d{2}$/.test(value)) {
            return false;
        }

        const [month, year] = value.split("/");

        const monthNum = Number(month);
        const yearNum = Number(year);

        if (monthNum < 1 || monthNum > 12) {
            return false;
        }

        const now = new Date();

        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear() % 100;

        if (yearNum < currentYear) {
            return false;
        }

        if (
            yearNum === currentYear &&
            monthNum < currentMonth
        ) {
            return false;
        }

        if (yearNum > currentYear + 20) {
            return false;
        }

        return true;
    }

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        const isAmex = /^3[47]/.test(value);

        const maxDigits = isAmex ? 15 : 16;

        value = value.slice(0, maxDigits);

        value = value.replace(/(.{4})/g, "$1 ").trim();

        setValue("cardNumber", value, {
            shouldValidate: true,
        });
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        value = value.slice(0, 4);

        if (value.length >= 3) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }

        setValue("expiryDate", value, {
            shouldValidate: true,
        });
    };

    const handleCvvChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        const maxLength = cardType === "amex" ? 4 : 3;

        value = value.slice(0, maxLength);

        setValue("cvv", value, {
            shouldValidate: true,
        });
    };




    const onSubmit = (data) => {
        saveData(data);
        onNext();
    };

    return (
        <>
            <h2 className="text-xl font-semibold mb-6">
                Payment Information
            </h2>

            <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
                <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 py-3 rounded-lg font-medium transition ${paymentMethod === "card"
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-slate-700"
                        }`}
                >
                    💳 Credit Card
                </button>

                <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex-1 py-3 rounded-lg font-medium transition ${paymentMethod === "paypal"
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-slate-700"
                        }`}
                >
                    🅿️ PayPal
                </button>
            </div>

            {paymentMethod === "card" && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Cardholder Name
                        </label>

                        <input
                            type="text"
                            placeholder="John Doe"
                            {...register("cardholderName", {
                                required: "Cardholder name is required",
                                pattern: {
                                    value: /^[\p{L}\s'-]+$/u,
                                    message:
                                        "Name can only contain letters, spaces, apostrophes, and hyphens",
                                },
                            })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2"
                        />

                        {errors.cardholderName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.cardholderName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Card Number
                        </label>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                {...register("cardNumber", {
                                    required: "Card number is required",
                                })}
                                value={cardNumber || ""}
                                onChange={handleCardNumberChange}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 pr-14"
                            />
                            {cardType && (
                                <div className="absolute inset-y-0 right-3 flex items-center text-slate-500 pointer-events-none">
                                    {getCardIcon(cardType)}
                                </div>
                            )}
                        </div>

                        {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.cardNumber.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Expiry Date
                            </label>

                            <input
                                type="text"
                                placeholder="MM/YY"
                                {...register("expiryDate", {
                                    required: "Expiry date is required",
                                    validate: (value) =>
                                        isValidExpiryDate(value) ||
                                        "Please enter a valid expiry date",
                                })}
                                value={expiryDate || ""}
                                onChange={handleExpiryChange}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                            />

                            {errors.expiryDate && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.expiryDate.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                CVV
                            </label>

                            <input
                                type="text"
                                placeholder={
                                    cardType === "amex"
                                        ? "1234"
                                        : "123"
                                }
                                {...register("cvv", {
                                    required: "CVV is required",
                                    minLength: {
                                        value:
                                            cardType === "amex"
                                                ? 4
                                                : 3,
                                        message: "Invalid CVV",
                                    },
                                })}
                                onChange={handleCvvChange}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                            />

                            {errors.cvv && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.cvv.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-4 py-2 border rounded-lg"
                        >
                            Back
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            )}

            {paymentMethod === "paypal" && (
                <div className="rounded-lg border border-slate-200 p-6">
                    <h3 className="font-semibold mb-2">
                        Pay with PayPal
                    </h3>

                    <p className="text-slate-600 mb-4">
                        You will be redirected to PayPal to complete
                        your payment securely.
                    </p>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-4 py-2 border rounded-lg"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handlePaypalCheckout}
                            disabled={isRedirecting}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg"
                        >
                            {isRedirecting
                                ? "Redirecting to PayPal..."
                                : "Continue with PayPal"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PaymentForm;