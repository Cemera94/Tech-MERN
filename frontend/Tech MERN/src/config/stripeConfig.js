import { loadStripe } from '@stripe/stripe-js';

const publicKey =
  'pk_test_51P94kGCMZtVUc9sEBv8o0mPO8xEy6ydD4qfWZuXkbp3A6SrjuA9SFkVqOnri5t2l0eSO5GfQsHolixLLlyVdbQud00qSaAZU6b';
const stripePromise = loadStripe(publicKey);

export default stripePromise;
