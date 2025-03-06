import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>AI Platform - Strona główna</title>
        <meta name="description" content="Platforma AI z funkcjami czatu i generowania obrazów" />
      </Head>
      
      <h1 className="text-4xl font-bold mb-8">Witaj w AI Platform</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Chat AI</h2>
          <p className="mb-4">Rozmawiaj z zaawansowanym modelem AI i uzyskaj odpowiedzi na swoje pytania.</p>
          <Link href="/chat">
            <a className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Rozpocznij czat
            </a>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Generowanie obrazów</h2>
          <p className="mb-4">Twórz unikalne obrazy na podstawie opisów tekstowych.</p>
          <Link href="/image">
            <a className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
              Generuj obrazy
            </a>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Subskrypcja</h2>
          <p className="mb-4">Uzyskaj dostęp premium do wszystkich funkcji platformy.</p>
          <Link href="/checkout">
            <a className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
              Wykup subskrypcję
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}