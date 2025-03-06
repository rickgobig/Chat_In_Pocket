import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children, title = 'AI Platform' }) {
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
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Platforma AI z funkcjami czatu i generowania obrazów" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav className="navbar navbar-expand-lg border-bottom mb-4">
        <div className="container">
          <Link href="/" className="navbar-brand">
            AI Platform
          </Link>
          
          <button 
            className={`btn ${theme === 'light' ? 'btn-dark' : 'btn-light'} ms-auto`}
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <><i className="bi bi-moon-fill me-2"></i> Tryb ciemny</>
            ) : (
              <><i className="bi bi-sun-fill me-2"></i> Tryb jasny</>
            )}
          </button>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}