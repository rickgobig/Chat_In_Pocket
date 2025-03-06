import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

export default function Chat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, { 
        prompt,
        model: 'gpt-4-turbo'
      });
      setResponse(res.data.response);
    } catch (err) {
      console.error('Błąd podczas komunikacji z API:', err);
      setError('Wystąpił błąd podczas komunikacji z API. Spróbuj ponownie później.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <Head>
        <title>Chat AI - AI Platform</title>
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
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 mb-0">AI Chat</h1>
      </div>
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="prompt" className="form-label">
                Twoje pytanie
              </label>
              <textarea
                id="prompt"
                rows="4"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="form-control"
                placeholder="Wpisz swoje pytanie..."
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className={`btn ${loading || !prompt.trim() 
                ? 'btn-secondary' 
                : 'btn-primary'} w-100`}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Przetwarzanie...
                </>
              ) : 'Wyślij'}
            </button>
          </form>
          
          {error && (
            <div className="alert alert-danger mb-4">
              {error}
            </div>
          )}
          
          {response && (
            <div className="mt-4">
              <h2 className="h4 mb-3">Odpowiedź:</h2>
              <div className="p-3 bg-light rounded">
                <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                  {response}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}