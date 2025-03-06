import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

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
    <div>
      <Head>
        <title>Generowanie obrazów - AI Platform</title>
      </Head>
      
      <h1 className="text-3xl font-bold mb-6">Generowanie obrazów AI</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Opisz obraz, który chcesz wygenerować
            </label>
            <textarea
              id="prompt"
              rows="4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Np. Górski krajobraz o zachodzie słońca z jeziorem w dolinie..."
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className={`w-full py-2 px-4 rounded-md text-white font-medium 
              ${loading || !prompt.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'}`}
          >
            {loading ? 'Generowanie...' : 'Wygeneruj obraz'}
          </button>
        </form>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {imageUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Wygenerowany obraz:</h2>
            <div className="border rounded-md overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Wygenerowany obraz AI" 
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}