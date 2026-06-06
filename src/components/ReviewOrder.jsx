function ReviewOrder({ checkoutData, onBack, onPlaceOrder }) {
    const {
        personalInfo,
        addressInfo,
        paymentInfo,
    } = checkoutData;

    const maskedCard =
        paymentInfo?.cardNumber
            ? `**** **** **** ${paymentInfo.cardNumber
                .replace(/\s/g, "")
                .slice(-4)}`
            : "PayPal";

    return (
        <>
            <h2 className="text-xl font-semibold mb-6">
                Review Your Order
            </h2>

            <div className="space-y-6">
                <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">
                        Personal Information
                    </h3>

                    <p>
                        <strong>Name:</strong>{" "}
                        {personalInfo.fullName}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {personalInfo.email}
                    </p>

                    <p>
                        <strong>Phone:</strong>{" "}
                        {personalInfo.phone}
                    </p>
                </div>

                <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">
                        Address Information
                    </h3>

                    <p>
                        <strong>Street:</strong>{" "}
                        {addressInfo.streetAddress}
                    </p>

                    <p>
                        <strong>City:</strong>{" "}
                        {addressInfo.city}
                    </p>

                    <p>
                        <strong>State:</strong>{" "}
                        {addressInfo.state}
                    </p>

                    <p>
                        <strong>Postal Code:</strong>{" "}
                        {addressInfo.postalCode}
                    </p>

                    <p>
                        <strong>Country:</strong>{" "}
                        {addressInfo.country}
                    </p>
                </div>

                <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">
                        Payment Information
                    </h3>

                    <p>
                        <strong>Method:</strong>{" "}
                        {paymentInfo.paymentMethod === "paypal"
                            ? "PayPal"
                            : "Credit Card"}
                    </p>

                    <p>
                        <strong>Payment:</strong>{" "}
                        {maskedCard}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Back
                    </button>

                    <button
                        type="button"
                        onClick={onPlaceOrder}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </>
    );
}

export default ReviewOrder;