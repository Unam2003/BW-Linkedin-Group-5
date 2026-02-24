import React from "react";

const HomeFooter = () => {
  return (
    <div className="mt-3 small text-muted">
      <div className="d-flex flex-wrap gap-2 mb-2">
        <a href="#" className="text-decoration-none text-muted">
          Informazioni
        </a>
        <a href="#" className="text-decoration-none text-muted">
          Accessibilità
        </a>
        <a href="#" className="text-decoration-none text-muted">
          Centro assistenza
        </a>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-2">
        <a href="#" className="text-decoration-none text-muted">
          Privacy e condizioni
        </a>
        <a href="#" className="text-decoration-none text-muted">
          Opzioni per gli annunci pubblicitari
        </a>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-2">
        <a href="#" className="text-decoration-none text-muted">
          Servizi alle aziende
        </a>
        <a href="#" className="text-decoration-none text-muted">
          Scarica l'app LinkedIn
        </a>
        <a href="#" className="text-decoration-none text-muted">
          Altro
        </a>
      </div>

      <div className="mt-3">
        <strong className="text-primary">LinkedIn</strong> © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default HomeFooter;
