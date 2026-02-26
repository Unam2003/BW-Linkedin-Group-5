import React from "react";
import HomeFooter from "./HomeFooter";
import { useNavigate } from "react-router-dom";

export default function SideBarDxHomePage() {
  const news = [
    {
      id: 1,
      title: "Usa: dazi al 15% per tutti",
      meta: "8h fa • 514 lettori",
    },
    {
      id: 2,
      title: 'Milano Cortina "ha definito un nuovo ..."',
      meta: "3h fa • 166 lettori",
    },
    {
      id: 3,
      title: "Più investimenti per gli alberghi italiani",
      meta: "3 giorni fa • 157 lettori",
    },
    {
      id: 4,
      title: "Unipol distribuiti ai soci 804 milioni",
      meta: "3 giorni fa • 106 lettori",
    },
    {
      id: 5,
      title: "Cosa ci lascerà Milano Cortina",
      meta: "2h fa • 8365 lettori",
    },
  ];
  const navigate = useNavigate();

  return (
    <aside className="d-flex flex-column gap-2">
      <div className="card shadow-sm">
        <div className="card-body pb-2">
          <div className="d-flex align-items-start justify-content-between">
            <div>
              <div className="fw-bold">LinkedIn Notizie</div>
              <div className="text-muted small">Storie principali</div>
            </div>
            <span className="text-muted" style={{ fontSize: 12 }}>
              i
            </span>
          </div>
        </div>

        <ul className="list-unstyled m-0 px-3 pb-2">
          {news.map((n) => (
            <li key={n.id} className="py-2">
              <a href="#" className="text-decoration-none text-dark d-flex gap-2">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: "#111",
                    borderRadius: "50%",
                    marginTop: 6,
                    flex: "0 0 auto",
                  }}
                  aria-hidden="true"
                />
                <div>
                  <div className="fw-semibold small" style={{ lineHeight: 1.2 }}>
                    {n.title}
                  </div>
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    {n.meta}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="px-3 pb-3">
          <button className="btn btn-link p-0 text-muted fw-semibold small text-decoration-none">
            Visualizza altro <span aria-hidden="true">▾</span>
          </button>
        </div>
      </div>

      <div className="card shadow-sm overflow-hidden">
        <div className="p-3" style={{ background: "#0B2F48" }}>
          <div className="text-white small fw-bold mb-2">LinkedIn</div>
          <div className="text-white fw-bold" style={{ lineHeight: 1.2 }}>
            Your job search powered by your network
          </div>

          <button className="btn btn-primary btn-sm mt-2" onClick={() => navigate("/jobs")}>
            Explore jobs
          </button>

          <div className="mt-3 rounded overflow-hidden">
            <img
              src="public/advertising/imgsidebardx.png"
              alt=""
              className="w-100"
              style={{
                height: 120,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

      <HomeFooter />
    </aside>
  );
}
