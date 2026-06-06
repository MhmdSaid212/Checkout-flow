import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

function PersonalInfoForm({ onNext, saveData, defaultValues }) {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl font-semibold mb-6">
                Contact Information
            </h2>

            {/* Full Name */}
            <div className="mb-4">
                <label
                    htmlFor="fullName"
                    className="block text-sm font-medium mb-2"
                >
                    Full Name
                </label>

                <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    {...register("fullName", {
                        required: "Full name is required",
                        minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                        },
                        setValueAs: (value) => value.trim(),
                        pattern: {
                            value: /^[\p{L}\s'-]+$/u,
                            message:
                                "Name can only contain letters, spaces, apostrophes, and hyphens",
                        },
                    })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.fullName.message}
                    </p>
                )}
            </div>

            {/* Email */}
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                >
                    Email Address
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                        },
                    })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Phone */}
            <div className="mb-6">
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                >
                    Phone Number
                </label>

                <Controller
                    name="phone"
                    control={control}
                    rules={{
                        required: "Phone number is required",
                        validate: (value) =>
                            isValidPhoneNumber(value || "") ||
                            "Please enter a valid phone number",
                    }}
                    render={({ field }) => (
                        <PhoneInput
                            {...field}
                            defaultCountry="LB"
                            international
                            value={field.value}
                            onChange={field.onChange}
                            className="border border-slate-300 rounded-lg px-3 py-2"
                        />
                    )}
                />

                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Continue
            </button>
        </form>
    );
}

export default PersonalInfoForm;