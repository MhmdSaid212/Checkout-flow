function Stepper({ step }) {
  const steps = [
    "Personal",
    "Address",
    "Payment",
    "Review",
    "Success",
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, index) => {
        const stepNumber = index + 1;

        return (
          <div
            key={label}
            className="flex items-center flex-1"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${
                    step >= stepNumber
                      ? "bg-blue-500 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
              >
                {stepNumber}
              </div>

              <span className="text-xs mt-2">
                {label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2
                  ${
                    step > stepNumber
                      ? "bg-blue-500"
                      : "bg-slate-200"
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;