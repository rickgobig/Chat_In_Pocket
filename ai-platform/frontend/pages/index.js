import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 mb-5">
          <h1 className="display-4 text-center">Witaj w AI Platform</h1>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="card-title h4">Chat AI</h2>
              <p className="card-text">Rozmawiaj z zaawansowanym modelem AI i uzyskaj odpowiedzi na swoje pytania.</p>
              <a href="/chat" className="btn btn-primary stretched-link">Rozpocznij czat</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="card-title h4">Generowanie obrazów</h2>
              <p className="card-text">Twórz unikalne obrazy na podstawie opisów tekstowych.</p>
              <a href="/image" className="btn btn-primary stretched-link">Generuj obrazy</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
          <div className="card-body">
              <h2 className="card-title h4">Subskrypcja</h2>
              <p className="card-text">Uzyskaj dostęp premium do wszystkich funkcji platformy.</p>
              <a 
                href="/checkout" 
                className="btn btn-primary stretched-link"
              >
                Wykup subskrypcję
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}