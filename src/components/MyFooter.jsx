import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light pt-5 border-top">
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold">Informazioni</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Informativa sulla community professionale
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Privacy e condizioni
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Sales Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Centro sicurezza
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold">Accessibilità</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Carriera
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Opzioni per gli annunci pubblicitari
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Mobile
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold">Talent Solutions</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Soluzioni di marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Pubblicità
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Piccole imprese
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3 mb-4">
            <div className="d-flex mb-3">
              <i className="bi bi-question-circle me-3 text-secondary"></i>
              <div>
                <h6 className="fw-bold mb-0">Domande?</h6>
                <small className="text-muted">Visita il nostro Centro assistenza</small>
              </div>
            </div>

            <div className="d-flex mb-3">
              <i className="bi bi-gear me-3 text-secondary"></i>
              <div>
                <h6 className="fw-bold mb-0">Gestisci il tuo account e la tua privacy</h6>
                <small className="text-muted">Vai alle impostazioni</small>
              </div>
            </div>

            <div className="d-flex">
              <i className="bi bi-shield-check me-3 text-secondary"></i>
              <div>
                <h6 className="fw-bold mb-0">Trasparenza sui contenuti consigliati</h6>
                <small className="text-muted">Scopri di più sui contenuti consigliati</small>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-3 mb-4 d-flex flex-column align-items-md-end">
            <h6 className="fw-bold">Seleziona lingua</h6>

            <div className="dropdown w-100 w-md-auto">
              <button className="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
                Italiano
              </button>

              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Italiano
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    English
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Français
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Español
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-start py-3 border-top">
          <small className="text-muted">LinkedIn Corporation © {new Date().getFullYear()}</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
