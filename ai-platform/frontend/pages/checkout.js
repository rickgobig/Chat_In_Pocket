import { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';

const stripePromise = loadStripe('pk_test_your_stripe_public_key');

export default function Checkout() {
  useEffect(() => {
    const handleDragStart = (e) => {
      e.preventDefault(); 
    };

    const addDragListeners = () => {
      const containers = document.querySelectorAll('.container, .container.py-4');
      containers.forEach(container => {
        container.addEventListener('dragstart', handleDragStart);
      });
    };

    addDragListeners();

    return () => {
      const containers = document.querySelectorAll('.container, .container.py-4');
      containers.forEach(container => {
        container.removeEventListener('dragstart', handleDragStart);
      });
    };
  }, []); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const plans = [
    {
      name: 'Basic',
      price: 900, 
      description: 'Basic access to AI features',
      features: ['Access to AI chat', '10 generated images per month']
    },
    {
      name: 'Premium',
      price: 2900, 
      description: 'Extended access to AI features',
      features: ['Unlimited access to AI chat', '50 generated images per month', 'Priority support']
    },
    {
      name: 'Business',
      price: 9900, 
      description: 'Full access for businesses',
      features: ['Unlimited access to all features', 'Dedicated support', 'API for developers']
    }
  ];

  const handleSubscribe = async (plan) => {
    setLoading(true);
    setError('');
    
    try {
      const stripe = await stripePromise;
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-checkout-session`, {
        amount: plan.price,
        currency: 'pln',
        description: `Subscription ${plan.name}`
      });
      
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.session_id
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      console.error('Error during creating payment session:', err);
      setError('An error occurred during initializing payment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Choose plan - AI Platform</title>
      </Head>

      <Navbar />
      
      <div className="container py-4">
        <h1 className="display-4 mb-4">Choose subscription plan</h1>
        
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
                  <p className="display-6 mb-3">{(plan.price / 100 + 0.99).toFixed(2)} $<small className="text-muted fs-6">/month</small></p>
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
                    Choose plan
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