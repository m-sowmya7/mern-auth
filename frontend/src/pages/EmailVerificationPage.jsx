import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { Button } from "../components/ui/button.jsx";
import { cn } from "../lib/utils.js";
import toast from "react-hot-toast";

export const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const { error, isLoading, verifyEmail } = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code];

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex]?.focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
            toast.success("Email verified successfully");
        } catch (error) {
            console.log(error);
        }
    };

    // Auto submit when all fields are filled
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
            <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8">
                <form className="my-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r text-white bg-clip-text">
                            Verify Your Email
                        </h2>
                        <p className="text-center text-gray-400">
                            Enter the 6-digit code sent to your email address.
                        </p>
                    </div>
                    <div className="flex justify-between gap-2 mb-2">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9]/g, ""))}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={cn(
                                    "w-12 h-12 text-center text-2xl font-bold bg-zinc-900 text-white border-2 border-zinc-700 rounded-lg focus:border-white focus:outline-none transition"
                                )}
                                autoFocus={index === 0}
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500 font-semibold mt-2 text-center">{error}</p>}
                    <Button
                        type="submit"
                        disabled={isLoading || code.some((digit) => !digit)}
                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    >
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </Button>
                </form>
            </div>
        </div>
    );
};