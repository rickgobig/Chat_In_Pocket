import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const router = useRouter();
  
  return (
    <nav className="navbar navbar-expand-lg border-bottom mb-4">
      <div className="container">
        <Link href="/" className="navbar-brand">
          AI Platform
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                href="/chat" 
                className={`nav-link ${router.pathname === '/chat' ? 'active' : ''}`}
              >
                Chat AI
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/image" 
                className={`nav-link ${router.pathname === '/image' ? 'active' : ''}`}
              >
                Generowanie obrazów
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/checkout" 
                className={`nav-link ${router.pathname === '/checkout' ? 'active' : ''}`}
              >
                Subskrypcja
              </Link>
            </li>
          </ul>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}