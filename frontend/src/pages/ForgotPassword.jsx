import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Input } from "../components/ui/input.jsx";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
            <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8">
                <div className="my-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white bg-clip-text">
                        Forgot Password
                    </h2>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <p className="text-gray-300 mb-6 text-center">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <Input
                                icon={Mail}
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-8 w-8 text-black" />
                            </div>
                            <p className="text-gray-300 mb-6">
                                If an account exists for {email}, you will receive a password reset link shortly.
                            </p>
                        </div>
                    )}
                </div>
                <div className="px-8 py-4flex justify-center rounded-b-2xl">
                    <Link to={"/login"} className="text-sm text-white hover:underline flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};