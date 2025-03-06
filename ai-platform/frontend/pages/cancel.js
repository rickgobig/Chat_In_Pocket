import Link from 'next/link';
import Head from 'next/head';

export default function Cancel() {
  return (
    <div className="text-center">
      <Head>
        <title>Płatność anulowana - AI Platform</title>
      </Head>
      
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        
        <h1 className="text-2xl font-bold mb-4">Płatność anulowana</h1>
        <p className="text-gray-600 mb-6">Twoja płatność została anulowana. Nie zostałeś obciążony.</p>
        
        <Link href="/checkout">
          <a className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md inline-block mr-4">
            Spróbuj ponownie
          </a>
        </Link>
        
        <Link href="/">
          <a className="text-blue-500 hover:text-blue-700">
            Wróć do strony głównej
          </a>
        </Link>
      </div>
    </div>
  );
}