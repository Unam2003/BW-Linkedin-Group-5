import { useEffect, useState } from "react"
import { Container, Card, Button, Dropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Welcome() {
  const navigate = useNavigate()

  // ✅ persistenza: se rimuovi l’account non torna dopo refresh
  const [accountVisible, setAccountVisible] = useState(() => {
    const saved = localStorage.getItem("li_account_visible")
    return saved === null ? true : saved === "true"
  })

  useEffect(() => {
    localStorage.setItem("li_account_visible", String(accountVisible))
  }, [accountVisible])

  const handleLoginSavedAccount = () => {
    navigate("/", { replace: true })
  }

  const handleOtherAccount = () => {
    navigate("/login")
  }

  const handleGoToRegistration = () => {
    navigate("/registration")
  }

  const handleRemoveAccount = () => {
    setAccountVisible(false)
  }

  return (
    <div className="bg-white min-vh-100 d-flex flex-column">
      <Container className="py-5 flex-grow-1 d-flex flex-column align-items-center">
        {/* Logo LinkedIn */}
        <div className="mb-4">
          <i className="bi bi-linkedin text-primary" style={{ fontSize: "44px" }}></i>
        </div>

        <h1 className="fw-semibold mb-2" style={{ fontSize: "2rem" }}>
          Piacere di rivederti
        </h1>

        <p className="text-secondary mb-4 text-center" style={{ maxWidth: 720 }}>
          Non perderti la tua prossima opportunità. Accedi per restare al passo con il tuo mondo professionale.
        </p>

        <Card className="w-100 shadow-sm" style={{ maxWidth: 420 }}>
          <Card.Body className="p-0">
            {/* Riga account salvato */}
            {accountVisible && (
              <div className="d-flex align-items-stretch border-bottom">
                {/* Bottone account */}
                <Button
                  type="button"
                  className="flex-grow-1 text-start d-flex align-items-center gap-3 rounded-0 border-0 py-3 px-3 bg-white"
                  onClick={handleLoginSavedAccount}
                >
                  <div className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center" style={{ width: 46, height: 46 }}>
                    <i className="bi bi-person-circle text-secondary" style={{ fontSize: 22 }}></i>
                  </div>

                  <div className="lh-sm">
                    <div className="fw-semibold text-dark">Samuel Valentini</div>
                    <div className="text-secondary" style={{ fontSize: 13 }}>
                      s*****@gmail.com
                    </div>
                  </div>
                </Button>

                {/* ✅ SOLO 3 puntini, SENZA freccina */}
                <Dropdown align="end" className="d-flex">
                  <Dropdown.Toggle
                    bsPrefix="btn" // evita la classe "dropdown-toggle" che aggiunge la freccina
                    variant="light"
                    className="rounded-0 border-0 bg-white px-3"
                    style={{ boxShadow: "none" }}
                  >
                    <i className="bi bi-three-dots-vertical text-secondary"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleRemoveAccount}>Rimuovi account</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}

            {/* Riga "Accedi usando un altro account" */}
            <Button
              type="button"
              className="w-100 text-start d-flex align-items-center gap-3 rounded-0 border-0 py-3 px-3 bg-white"
              onClick={handleOtherAccount}
            >
              <div className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center" style={{ width: 46, height: 46 }}>
                <i className="bi bi-person-circle text-secondary" style={{ fontSize: 22 }}></i>
              </div>

              <div className="fw-semibold text-dark">Accedi usando un altro account</div>
            </Button>
          </Card.Body>
        </Card>

        {/* Link Iscriviti ora -> Registration */}
        <div className="mt-4 text-secondary">
          Non hai un account LinkedIn?{" "}
          <Button variant="link" className="p-0 align-baseline text-primary fw-semibold text-decoration-none" onClick={handleGoToRegistration}>
            Iscriviti ora
          </Button>
        </div>
      </Container>
    </div>
  )
}
