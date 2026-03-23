---
name: stripe-payments
description: Use when integrating Stripe payments, subscriptions, webhooks, or billing into web applications. Covers Checkout, Payment Intents, subscriptions, customer portal, and webhook handling.
---

# Stripe Payments

## Setup

```bash
bun add stripe @stripe/stripe-js
```

```ts
// lib/stripe.ts — server-side client
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})
```

## Checkout Session (One-time Payment)

```ts
// app/api/checkout/route.ts (Next.js)
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { priceId, userId } = await req.json()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: { userId },
    customer_email: 'user@example.com', // or customer: stripeCustomerId
  })

  return NextResponse.json({ url: session.url })
}
```

```tsx
// Client-side redirect
const response = await fetch('/api/checkout', {
  method: 'POST',
  body: JSON.stringify({ priceId: 'price_xxx' }),
})
const { url } = await response.json()
window.location.href = url
```

## Subscription Checkout

```ts
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [{ price: 'price_monthly_xxx', quantity: 1 }],
  success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
  cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  subscription_data: {
    trial_period_days: 14,
    metadata: { userId },
  },
})
```

## Customer Portal

```ts
// Let users manage their subscription
export async function POST(req: Request) {
  const { customerId } = await req.json()

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/settings`,
  })

  return NextResponse.json({ url: session.url })
}
```

## Webhooks

```ts
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = (await headers()).get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.CheckoutSession
      const userId = session.metadata?.userId
      // Provision access, send email, etc.
      break
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      // Update user subscription status in DB
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      // Revoke access
      break
    }

    case 'invoice.payment_failed': {
      // Notify user of failed payment
      break
    }
  }

  return new Response(null, { status: 200 })
}

// next.config.ts — disable body parsing for webhook route
export const config = { api: { bodyParser: false } }
```

## Payment Intent (Custom UI)

```ts
// Server: create intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000, // in cents
  currency: 'brl',
  metadata: { orderId: '123' },
})
return NextResponse.json({ clientSecret: paymentIntent.client_secret })
```

```tsx
// Client: with Stripe Elements
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/success` },
    })

    if (error) console.error(error.message)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit">Pay</button>
    </form>
  )
}

export function PaymentPage({ clientSecret }: { clientSecret: string }) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  )
}
```

## Useful Utilities

```ts
// Format amount for display
const formatAmount = (amount: number, currency = 'brl') =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency.toUpperCase() })
    .format(amount / 100)

// Create or retrieve customer
async function getOrCreateCustomer(email: string, userId: string) {
  const existing = await stripe.customers.list({ email, limit: 1 })
  if (existing.data.length > 0) return existing.data[0]

  return stripe.customers.create({ email, metadata: { userId } })
}
```

## Local Testing

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
```

## Environment Variables

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_URL=http://localhost:3000
```
