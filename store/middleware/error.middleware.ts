import { isRejectedWithValue } from "@reduxjs/toolkit"
import { toast } from "sonner"
import type { Middleware } from "@reduxjs/toolkit"

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
    // If an RTK Query endpoint fails, it dispatches a "rejected" action
    if (isRejectedWithValue(action)) {
        const payload = action.payload as {
            status?: number | string;
            data?: { error?: { message?: string }; message?: string; errors?: unknown };
        };

        // 401s and 403s are handled silently by baseQueryWithReauth or local component logic
        if (payload?.status === 401 || payload?.status === 403) {
            return next(action);
        }

        // Server offline / CORS failures
        if (payload?.status === "FETCH_ERROR") {
            toast.error("Network Error", {
                description: "Cannot connect to the server. Please check your connection.",
            });
            return next(action);
        }

        // Standardized backend API errors (using our ApiResponse<T> format)
        const errorData = payload?.data;
        if (errorData) {
            // Check for our custom nested error format `error.message` or fallback to root `message`
            const errorMessage = errorData.error?.message || errorData.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        }
    }

    return next(action);
};
