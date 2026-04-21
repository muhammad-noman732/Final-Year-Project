import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('[stripe-server] STRIPE_SECRET_KEY is not set in environment.');
}

export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY,
    {
        apiVersion: '2026-03-25.dahlia',
        typescript: true,
        appInfo: {
            name: "UniSync",
            version: "1.0.0"
        },
        maxNetworkRetries: 2
    }
)