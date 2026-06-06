import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";
import ReactCountryFlag from "react-country-flag";

function AddressForm({ onNext, saveData, onBack, defaultValues }) {
    const countries = countryList().getData();

    const formatOptionLabel = ({ label, value }) => (
        <div className="flex items-center gap-2">
            <ReactCountryFlag
                countryCode={value}
                svg
                style={{
                    width: "1.2em",
                    height: "1.2em",
                }}
            />
            <span>{label}</span>
        </div>
    );

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: 42,
            borderRadius: 8,
            borderColor: state.isFocused ? "#3b82f6" : "#cbd5e1",
            boxShadow: "none",
            "&:hover": {
                borderColor: "#3b82f6",
            },
        }),
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues,
    });

    const onSubmit = (data) => {

        saveData(data);
        onNext();

    };

    return (
        <>
            <h2 className="text-xl font-semibold mb-6">
                Address Information
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Street Address
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your street address, e.g. 123 Main Street"
                        {...register("streetAddress", {
                            required: "Street address is required",
                            minLength: {
                                value: 5,
                                message: "Street address must be at least 5 characters",
                            },
                            maxLength: {
                                value: 100,
                                message: "Street address cannot exceed 100 characters",
                            },
                        })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    />

                    {errors.streetAddress && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.streetAddress.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        City
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your city, e.g. New York"
                        {...register("city", {
                            required: "City is required",
                            pattern: {
                                value: /^[\p{L}\s'-]+$/u,
                                message:
                                    "City can only contain letters, spaces, apostrophes, and hyphens",
                            },
                        })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    />

                    {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.city.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        State / Province
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your state or province, e.g. California"
                        {...register("state", {
                            required: "State / Province is required",
                            pattern: {
                                value: /^[\p{L}\s'-]+$/u,
                                message:
                                    "State / Province can only contain letters, spaces, apostrophes, and hyphens",
                            },
                        })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    />

                    {errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.state.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Postal Code
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your postal code, e.g. 10001"
                        {...register("postalCode", {
                            required: "Postal code is required",
                            pattern: {
                                value: /^[A-Za-z0-9\s-]+$/,
                                message:
                                    "Postal code can only contain letters, numbers, spaces, and hyphens",
                            },
                        })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    />

                    {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.postalCode.message}
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        Country
                    </label>

                    <Controller
                        name="country"
                        control={control}
                        rules={{
                            required: "Please select a country",
                        }}
                        render={({ field }) => (
                            <Select
                                options={countries}
                                styles={customStyles}
                                formatOptionLabel={formatOptionLabel}
                                placeholder="Select a country..."
                                value={countries.find(
                                    (country) => country.value === field.value
                                )}
                                onChange={(selectedOption) =>
                                    field.onChange(selectedOption?.value)
                                }
                            />
                        )}
                    />

                    {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.country.message}
                        </p>
                    )}
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
        </>
    );
}

export default AddressForm;