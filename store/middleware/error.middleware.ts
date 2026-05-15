import { isRejectedWithValue } from "@reduxjs/toolkit"
import { toast } from "sonner"
import type { Middleware } from "@reduxjs/toolkit"

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {

    if (isRejectedWithValue(action)) {
        const payload = action.payload as {
            status?: number | string;
            data?: { error?: { message?: string }; message?: string; errors?: unknown };
        };

        if (payload?.status === 401 || payload?.status === 403) {
            return next(action);
        }

        if (payload?.status === "FETCH_ERROR") {
            toast.error("Network Error", {
                description: "Cannot connect to the server. Please check your connection.",
            });
            return next(action);
        }

        const errorData = payload?.data;
        if (errorData) {

            const errorMessage = errorData.error?.message || errorData.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        }
    }

    return next(action);
};
