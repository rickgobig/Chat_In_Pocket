import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);

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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };


  return (
    <>
      <Head>
        <title>AI Platform</title>
      </Head>

      <Navbar />
      
      <div className="container py-4">
        <h1 className="display-4 text-center mb-5">Welcome to AI Platform</h1>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title h4">Chat AI</h2>
                <p className="card-text">Chat with advanced AI model.</p>
                <a href="/chat" className="btn btn-primary stretched-link">Start chat</a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title h4">Art Create</h2>
                <p className="card-text">Create unique images based on text descriptions.</p>
                <a href="/image" className="btn btn-primary stretched-link">Generate images</a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title h4">Pricing</h2>
                <p className="card-text">Get access to all platform features.</p>
                <a 
                  href="/checkout" 
                  className="btn btn-primary stretched-link">
                  Buy subscription
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}