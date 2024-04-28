import db from '@/db/db';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';
import { CheckoutForm } from './_components/CheckoutForm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function Purchasepage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  console.log(product);
  if (product === null) return notFound();

  // create stripe payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: 'AUD',
    metadata: {
      productId: product.id,
    },
  });

  console.log(paymentIntent);

  if (paymentIntent.client_secret === null)
    throw new Error('Stripe failed to create a payment intent.');

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
