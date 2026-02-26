import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeftBarHome from "./LeftBarHome/LeftBarHome";
import HomeFooter from "./HomeFooter";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("search") || "";

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(false);

      const url = queryParam
        ? `https://strive-benchmark.herokuapp.com/api/jobs?search=${encodeURIComponent(queryParam)}`
        : "https://strive-benchmark.herokuapp.com/api/jobs?limit=20";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Errore Server: ${response.status}`);
      }

      const resData = await response.json();

      if (resData && resData.data) {
        setJobs(resData.data);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("ERRORE DETTAGLIATO:", err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [queryParam]);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-3 mb-3">
            {" "}
            <LeftBarHome />
            <HomeFooter />
          </div>

          <div className="col-12 col-lg-9">
            <div className="card shadow-sm border-0">
              <div className="row g-0">
                <div className={`col-12 ${selectedJob ? "col-md-5 border-end" : "col-md-12"} bg-white`}>
                  <div className="p-3 border-bottom bg-light">
                    <h6 className="fw-bold mb-0">{queryParam ? `Risultati per: ${queryParam}` : "Offerte consigliate"}</h6>
                  </div>

                  <div className="list-group list-group-flush" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                    {loading && (
                      <div className="p-4 text-center text-primary">
                        <div className="spinner-border spinner-border-sm me-2"></div>Caricamento...
                      </div>
                    )}
                    {error && <div className="p-4 text-center text-danger">Impossibile caricare i lavori. Riprova più tardi.</div>}
                    {!loading && !error && jobs.length === 0 && <div className="p-4 text-center">Nessun lavoro trovato.</div>}

                    {jobs.map((job) => (
                      <button
                        key={job._id}
                        onClick={() => setSelectedJob(job)}
                        className={`list-group-item list-group-item-action p-3 border-0 border-bottom d-flex align-items-start ${
                          selectedJob?._id === job._id ? "bg-primary-subtle border-start border-primary border-4" : ""
                        }`}
                      >
                        <div className="bg-secondary bg-opacity-10 rounded p-2 me-3">
                          <i className="bi bi-briefcase text-secondary"></i>
                        </div>
                        <div className="text-start">
                          <h6 className="mb-0 fw-bold text-primary" style={{ fontSize: "0.9rem" }}>
                            {job.title}
                          </h6>
                          <div className="small text-dark">{job.company_name}</div>
                          <div className="small text-muted">{job.candidate_required_location}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedJob && (
                  <div className="col-12 col-md-7 d-flex flex-column bg-white">
                    <div className="p-4 h-100" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h4 className="fw-bold">{selectedJob.title}</h4>
                          <h6 className="text-primary">{selectedJob.company_name}</h6>
                          <p className="text-muted small">{selectedJob.candidate_required_location}</p>
                        </div>
                        <button className="btn-close" onClick={() => setSelectedJob(null)} aria-label="Chiudi"></button>
                      </div>

                      <div className="mb-4">
                        <a href={selectedJob.url} target="_blank" rel="noreferrer" className="btn btn-primary rounded-pill px-4 fw-bold me-2">
                          Candidati
                        </a>
                        <button className="btn btn-outline-secondary rounded-pill px-4 fw-bold">Salva</button>
                      </div>

                      <hr />

                      <div className="small" dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
