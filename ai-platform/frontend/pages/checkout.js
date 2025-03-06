import { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';

// Zastąp to swoim kluczem publicznym Stripe
const stripePromise = loadStripe('pk_test_your_stripe_public_key');

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const plans = [
    {
      name: 'Basic',
      price: 2900, // 29 PLN w groszach
      description: 'Podstawowy dostęp do funkcji AI',
      features: ['Dostęp do czatu AI', '10 generowanych obrazów miesięcznie']
    },
    {
      name: 'Premium',
      price: 4900, // 49 PLN w groszach
      description: 'Rozszerzony dostęp do funkcji AI',
      features: ['Nieograniczony dostęp do czatu AI', '50 generowanych obrazów miesięcznie', 'Priorytetowa obsługa']
    },
    {
      name: 'Business',
      price: 9900, // 99 PLN w groszach
      description: 'Pełny dostęp dla firm',
      features: ['Nieograniczony dostęp do wszystkich funkcji', 'Dedykowane wsparcie', 'API dla deweloperów']
    }
  ];

  const handleSubscribe = async (plan) => {
    setLoading(true);
    setError('');
    
    try {
      const stripe = await stripePromise;
      
      // Utwórz sesję płatności
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-checkout-session`, {
        amount: plan.price,
        currency: 'pln',
        description: `Subskrypcja ${plan.name}`
      });
      
      // Przekieruj do strony płatności Stripe
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.session_id
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      console.error('Błąd podczas tworzenia sesji płatności:', err);
      setError('Wystąpił błąd podczas inicjowania płatności. Spróbuj ponownie później.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Subskrypcja - AI Platform</title>
      </Head>
      
      <h1 className="text-3xl font-bold mb-6">Wybierz plan subskrypcji</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold mb-4">{(plan.price / 100).toFixed(2)} PLN<span className="text-sm text-gray-500 font-normal">/miesiąc</span></p>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            
            <ul className="mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => handleSubscribe(plan)}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium 
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'}`}
            >
              {loading ? 'Przetwarzanie...' : 'Wybierz plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}