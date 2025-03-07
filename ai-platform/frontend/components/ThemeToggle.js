import { useState, useEffect } from 'react';

export default function ThemeToggle() {
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
    <button 
      className={`btn ${theme === 'light' ? 'btn-dark' : 'btn-light'}`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <><i className="bi bi-moon-fill me-2"></i> Dark</>
      ) : (
        <><i className="bi bi-sun-fill me-2"></i> Light</>
      )}
    </button>
  );
} 