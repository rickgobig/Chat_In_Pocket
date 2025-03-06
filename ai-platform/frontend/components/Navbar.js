import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold">AI Platform</a>
        </Link>
        <div className="space-x-4">
          <Link href="/chat">
            <a className={`hover:text-blue-300 ${router.pathname === '/chat' ? 'text-blue-300' : ''}`}>
              Chat AI
            </a>
          </Link>
          <Link href="/image">
            <a className={`hover:text-blue-300 ${router.pathname === '/image' ? 'text-blue-300' : ''}`}>
              Generowanie obrazów
            </a>
          </Link>
          <Link href="/checkout">
            <a className={`hover:text-blue-300 ${router.pathname === '/checkout' ? 'text-blue-300' : ''}`}>
              Subskrypcja
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}