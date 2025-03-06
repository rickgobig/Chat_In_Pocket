import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

export default function ImageGenerator() {
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
    <div className="container py-5">
      <Head>
        <title>Generowanie obrazów - AI Platform</title>
      </Head>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link 
          href="/" 
          className="btn btn-outline-secondary d-inline-flex align-items-center"
        >
          <span>
            <i className="bi bi-arrow-left me-2"></i>
            Powrót do strony głównej
          </span>
        </Link>
        <ThemeToggle />
      </div>
      
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
  );
}