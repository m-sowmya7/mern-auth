import { useAuthStore } from "../store/authStore.js";
import { formatDate } from "../util/date.js";

export const Dashboard = () => {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    // return (
    //     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
    //         <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8">
    //             <h2 className="text-3xl font-bold mb-6 text-center text-white bg-clip-text">
    //                 Dashboard
    //             </h2>
    //             <div className="space-y-6">
    //                 <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-700">
    //                     <h3 className="text-xl font-semibold text-white mb-3">Profile Information</h3>
    //                     <p className="text-gray-300">Name: {user.name}</p>
    //                     <p className="text-gray-300">Email: {user.email}</p>
    //                 </div>
    //                 <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-700">
    //                     <h3 className="text-xl font-semibold text-white mb-3">Account Activity</h3>
    //                     <p className="text-gray-300">
    //                         <span className="font-bold">Joined: </span>
    //                         {new Date(user.createdAt).toLocaleDateString("en-US", {
    //                             year: "numeric",
    //                             month: "long",
    //                             day: "numeric",
    //                         })}
    //                     </p>
    //                     <p className="text-gray-300">
    //                         <span className="font-bold">Last Login: </span>
    //                         {formatDate(user.lastLogin)}
    //                     </p>
    //                 </div>
    //             </div>
    //             <div className="mt-6">
    //                 <button
    //                     onClick={handleLogout}
    //                     className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
    //                 >
    //                     Logout
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white text-black p-4 md:rounded-2xl md:p-8 dark:bg-black dark:text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>
            <div className="space-y-6">
                <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 dark:bg-zinc-900 dark:border-zinc-700">
                    <h3 className="text-xl font-semibold mb-3">Profile Information</h3>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 dark:bg-zinc-900 dark:border-zinc-700">
                    <h3 className="text-xl font-semibold mb-3">Account Activity</h3>
                    <p>
                        <span className="font-bold">Joined: </span>
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                    <p>
                        <span className="font-bold">Last Login: </span>
                        {formatDate(user.lastLogin)}
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <button
                    onClick={handleLogout}
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
);
};