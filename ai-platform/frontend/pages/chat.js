import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '../components/Navbar';

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
    <>
      <Head>
        <title>Chat AI - AI Platform</title>
      </Head>

      <Navbar />
      
      <div className="container py-4">
        <h1 className="display-4 mb-4">Chat AI</h1>
        
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
    </>
  );
}