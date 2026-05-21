import { loadStripe, type Stripe } from "@stripe/stripe-js"

let _stripePromise: Promise<Stripe | null> | null = null

export function getStripePromise(): Promise<Stripe | null> {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  if (!key) throw new Error("[stripe-client] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set.")
  if (!_stripePromise) _stripePromise = loadStripe(key)
  return _stripePromise
}
