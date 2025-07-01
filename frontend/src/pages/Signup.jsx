import { Label } from "../components/ui/label.jsx";
import { Input } from "../components/ui/input.jsx";
import { cn } from "../lib/utils.js";
import {
    IconBrandGoogle,
} from "@tabler/icons-react";
import { useState } from "react";
import { PasswordStrengthMeter } from "../components/PasswordStrengthMeter.jsx";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};

const BottomGradient = () => {
    return (
        <>
            <span
                className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span
                className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

export function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { signup, error, isLoading } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            navigate("/verify-email");
        } catch (error) {
            // Optionally handle error here
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
            <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8">
                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                        <LabelInputContainer>
                            <Label htmlFor="firstname">Name</Label>
                            <Input
                                id="firstname"
                                placeholder="Tyler"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="projectmayhem@fc.com"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </LabelInputContainer>
                    <PasswordStrengthMeter password={password} className="p-2" />
                    <div className="mb-6"></div>

                    {error && <p className="text-red-500 font-semibold mt-1">{error}</p>}

                    <button
                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing up..." : "Sign up →"}
                        <BottomGradient />
                    </button>

                    <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

                    <div className="flex flex-col space-y-2">
                        <button
                            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                            type="button">
                            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                Google
                            </span>
                            <BottomGradient />
                        </button>
                    </div>
                </form>
                <div className="px-4 py-0.5  bg-opacity-50 flex justify-center rounded-b-2xl">
                    <p className="text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-white hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}