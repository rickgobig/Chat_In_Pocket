import Link from 'next/link';
import Head from 'next/head';

export default function Success() {
  return (
    <div className="text-center">
      <Head>
        <title>Płatność zakończona - AI Platform</title>
      </Head>
      
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        
        <h1 className="text-2xl font-bold mb-4">Płatność zakończona pomyślnie!</h1>
        <p className="text-gray-600 mb-6">Dziękujemy za zakup subskrypcji. Twoje konto zostało zaktualizowane.</p>
        
        <Link href="/">
          <a className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md inline-block">
            Wróć do strony głównej
          </a>
        </Link>
      </div>
    </div>
  );
}