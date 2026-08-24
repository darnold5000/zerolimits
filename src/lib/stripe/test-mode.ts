/** Client-safe: Stripe test mode (show test card instructions). */
export function isStripeTestMode(): boolean {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? "";
  return key.startsWith("pk_test_");
}
