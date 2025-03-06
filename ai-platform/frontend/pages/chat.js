import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

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
    <div>
      <Head>
        <title>AI Chat - AI Platform</title>
      </Head>
      
      <h1 className="text-3xl font-bold mb-6">AI Chat</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Twoje pytanie
            </label>
            <textarea
              id="prompt"
              rows="4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Wpisz swoje pytanie..."
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className={`w-full py-2 px-4 rounded-md text-white font-medium 
              ${loading || !prompt.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Przetwarzanie...' : 'Wyślij'}
          </button>
        </form>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {response && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Odpowiedź:</h2>
            <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}