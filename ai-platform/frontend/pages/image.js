import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';

export default function ImageGenerator() {
  useEffect(() => {
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
      console.error('Error during image generation:', err);
      setError('An error occurred during image generation. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Image generation - AI Platform</title>
      </Head> 

      <Navbar />
      
      <div className="container py-4">
        <h1 className="display-4 mb-4">Image generation</h1>
        
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="prompt" className="form-label h5">
                  Describe the image you want to generate
                </label>
                <textarea
                  id="prompt"
                  rows="4"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="form-control"
                  placeholder="For example: Mountain landscape with sunset over a lake in the valley..."
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
                    Generating...
                  </>
                ) : 'Generate image'}
              </button>
            </form>
            
            {error && (
              <div className="alert alert-danger mt-4">
                {error}
              </div>
            )}
            
            {imageUrl && (
              <div className="mt-4">
                <h2 className="h4 mb-3">Generated image:</h2>
                <div className="border rounded overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt="Generated image" 
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