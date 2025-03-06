import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  const [theme, setTheme] = useState('light');

  // Inicjalizacja motywu z localStorage przy montowaniu komponentu
  useEffect(() => {
    // Sprawdź zapisany motyw
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }, []);

  // Funkcja przełączająca motyw
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
        <h1 className="display-4 text-center mb-5">Witaj w AI Platform</h1>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title h4">Chat AI</h2>
                <p className="card-text">Rozmawiaj z zaawansowanym modelem AI i uzyskaj odpowiedzi na swoje pytania.</p>
                <a href="/chat" className="btn btn-primary stretched-link">Rozpocznij czat</a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title h4">Generowanie obrazów</h2>
                <p className="card-text">Twórz unikalne obrazy na podstawie opisów tekstowych.</p>
                <a href="/image" className="btn btn-primary stretched-link">Generuj obrazy</a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title h4">Subskrypcja</h2>
                <p className="card-text">Uzyskaj dostęp premium do wszystkich funkcji platformy.</p>
                <a 
                  href="/checkout" className="btn btn-primary stretched-link">Wykup subskrypcję </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}