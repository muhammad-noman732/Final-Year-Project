import { loadStripe, type Stripe } from '@stripe/stripe-js';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('[stripe-client] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set.');
}

export const stripePromise: Promise<Stripe | null> = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);