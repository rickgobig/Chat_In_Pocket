import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';

export default function ImageGenerator() {
  useEffect(() => {
    const handleDragStart = (e) => {
      e.preventDefault(); // Zablokuje przenoszenie
    };

    // Funkcja do dodawania nasłuchiwacza do kontenerów
    const addDragListeners = () => {
      const containers = document.querySelectorAll('.container, .container.py-4');
      containers.forEach(container => {
        container.addEventListener('dragstart', handleDragStart);
      });
    };

    // Dodaj nasłuchiwacze po zamontowaniu komponentu
    addDragListeners();

    // Cleanup
    return () => {
      const containers = document.querySelectorAll('.container, .container.py-4');
      containers.forEach(container => {
        container.removeEventListener('dragstart', handleDragStart);
      });
    };
  }, []); // Pusty array oznacza, że efekt uruchomi się tylko raz po zamontowaniu komponentu
  
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/image`, { 
        prompt,
        size: '1024x1024'
      });
      setImageUrl(res.data.image_url);
    } catch (err) {
      console.error('Błąd podczas generowania obrazu:', err);
      setError('Wystąpił błąd podczas generowania obrazu. Spróbuj ponownie później.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Generowanie obrazów - AI Platform</title>
      </Head>

      <Navbar />
      
      <div className="container py-4">
        <h1 className="display-4 mb-4">Generowanie obrazów AI</h1>
        
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="prompt" className="form-label h5">
                  Opisz obraz, który chcesz wygenerować
                </label>
                <textarea
                  id="prompt"
                  rows="4"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="form-control"
                  placeholder="Np. Górski krajobraz o zachodzie słońca z jeziorem w dolinie..."
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="btn btn-primary rounded-pill"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Generowanie...
                  </>
                ) : 'Generuj obraz'}
              </button>
            </form>
            
            {error && (
              <div className="alert alert-danger mt-4">
                {error}
              </div>
            )}
            
            {imageUrl && (
              <div className="mt-4">
                <h2 className="h4 mb-3">Wygenerowany obraz:</h2>
                <div className="border rounded overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt="Wygenerowany obraz AI" 
                    className="w-100 h-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}