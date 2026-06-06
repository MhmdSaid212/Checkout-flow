function SuccessPage() {
    const orderNumber = Math.floor(
        100000 + Math.random() * 900000
    );

    return (
        <div className="text-center py-12">
            <div className="text-6xl mb-4">
                ✅
            </div>

            <h2 className="text-2xl font-bold mb-3">
                Order Placed Successfully!
            </h2>

            <p className="text-slate-600 mb-6">
                Thank you for your purchase.
            </p>

            <div className="bg-slate-100 rounded-lg p-4 max-w-sm mx-auto mb-6">
                <p className="text-sm text-slate-500">
                    Order Number
                </p>

                <p className="font-bold text-lg">
                    #{orderNumber}
                </p>
            </div>

            <p className="text-slate-500 mb-6">
                A confirmation email has been sent.
            </p>

            <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg"
            >
                Continue Shopping
            </button>
        </div>
    );
}

export default SuccessPage;