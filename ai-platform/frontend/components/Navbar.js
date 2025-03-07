import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const router = useRouter();
  
  return (
    <nav className="navbar navbar-expand-lg mb-5 shadow-sm sticky-top bg-body">
      <div className="container" >
        <Link href="/" className="navbar-brand fs-4 fw-bold ">
        <a 
          href="/" 
          onClick={(e) => {e.preventDefault(); router.push('/')}} 
          className="navbar-brand fs-4 fw-bold"
        >
          <span className="me-2">🚀</span> AI Platform
        </a>
        </Link>
        
        <button
          className="navbar-toggler border-0"
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
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-2">
                <a 
                  href="/chat"
                  onClick={(e) => {e.preventDefault(); router.push('/chat')}}
                  className={`btn ${router.pathname === '/chat' ? 'btn-primary shadow-sm' : 'btn-light hover-effect'} rounded-pill px-4 py-2 fw-medium`}
                >
                  <span>💬</span> Chat AI
                </a>
            </li>
            <li className="nav-item mx-2">
               <a 
                href="/chat"
                onClick={(e) => {e.preventDefault(); router.push('/image')}}
                className={`btn ${router.pathname === '/image' ? 'btn-primary shadow-sm' : 'btn-light hover-effect'} rounded-pill px-4 py-2 fw-medium`}
              >
                <span>🖼️</span> Art Create
              </a>
            </li>
            <li className="nav-item mx-2">
              <a 
                href="/chat"
                onClick={(e) => {e.preventDefault(); router.push('/checkout')}}
                className={`btn ${router.pathname === '/checkout' ? 'btn-primary shadow-sm' : 'btn-light hover-effect'} rounded-pill px-4 py-2 fw-medium`}
              >
                <span>⭐</span> Pricing
              </a>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}