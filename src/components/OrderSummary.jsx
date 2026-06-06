import { useState } from "react";

function OrderSummary() {
    const [planPrice] = useState(
        Math.floor(Math.random() * 151) + 50
    );

    const [shipping] = useState(
        Math.floor(Math.random() * 16) + 5
    );

    const tax = Math.round(planPrice * 0.08);

    const total = planPrice + shipping + tax;

    return (
        <aside className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
                Order Summary
            </h2>

            <div className="space-y-4">
                <div className="flex justify-between">
                    <span>Premium Plan</span>
                    <span>${planPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>

                <hr className="border-slate-200" />

                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </aside>
    );
}

export default OrderSummary;