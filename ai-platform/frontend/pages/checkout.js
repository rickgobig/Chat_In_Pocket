import { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';

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
    <>
      <Head>
        <title>Wybierz plan - AI Platform</title>
      </Head>

      <Navbar />
      
      <div className="container py-4">
        <h1 className="display-4 mb-4">Wybierz plan subskrypcji</h1>
        
        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
        )}
        
        <div className="row g-4">
          {plans.map((plan) => (
            <div key={plan.name} className="col-md-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title h3">{plan.name}</h2>
                  <p className="display-6 mb-3">{(plan.price / 100).toFixed(2)} PLN<small className="text-muted fs-6">/miesiąc</small></p>
                  <p className="card-text text-muted mb-3">{plan.description}</p>
                  
                  <ul className="list-unstyled mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={loading}
                    className="btn btn-primary rounded-pill mt-auto"
                  >
                    Wybierz plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}