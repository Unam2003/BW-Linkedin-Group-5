import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Registration() {
  const navigate = useNavigate()

  const CHIAVE_UTENTE_REGISTRATO = "utenteRegistrato"
  const CHIAVE_MOSTRA_ACCOUNT_SALVATO = "mostraAccountSalvato"
  const CHIAVE_UTENTE_LOGGATO = "utenteLoggato"

  const salvaUtenteNelLocalStorage = (datiUtente) => {
    // ✅ progetto/compito: salviamo tutto (anche password)
    localStorage.setItem(CHIAVE_UTENTE_REGISTRATO, JSON.stringify(datiUtente))
    localStorage.setItem(CHIAVE_MOSTRA_ACCOUNT_SALVATO, "true")
  }

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    title: "",
    about: "",
    area: "",
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // ✅ 1) salva utente
    salvaUtenteNelLocalStorage(form)

    // ✅ 2) login automatico
    localStorage.setItem(CHIAVE_UTENTE_LOGGATO, "true")

    // ✅ 3) vai direttamente in home (come accesso effettuato)
    navigate("/", { replace: true })
  }

  return (
    <div className="bg-white min-vh-100">
      <Container className="py-4">
        <div className="text-center mb-4">
          <h1
            className="mb-2"
            style={{
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              fontSize: 34,
              fontWeight: 600,
            }}
          >
            Welcome to Linkedin Registration Page
          </h1>

          <p className="text-secondary mb-0">Insert your personal information to be displayed on your linkedin profile page</p>
        </div>

        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={7} lg={5} xl={4}>
            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
              <Form.Control placeholder="Name" value={form.name} onChange={handleChange("name")} />
              <Form.Control placeholder="Surname" value={form.surname} onChange={handleChange("surname")} />
              <Form.Control type="email" placeholder="Email address" value={form.email} onChange={handleChange("email")} />
              <Form.Control placeholder="Username" value={form.username} onChange={handleChange("username")} />
              <Form.Control type="password" placeholder="Password" value={form.password} onChange={handleChange("password")} />
              <Form.Control placeholder="Job Title" value={form.title} onChange={handleChange("title")} />
              <Form.Control as="textarea" rows={5} placeholder="About" value={form.about} onChange={handleChange("about")} />
              <Form.Control placeholder="Town, Region, Country" value={form.area} onChange={handleChange("area")} />

              <div className="d-flex justify-content-center mt-3">
                <Button
                  type="submit"
                  className="px-5 py-2 border-0"
                  style={{
                    backgroundColor: "#00E676",
                    color: "black",
                    fontWeight: 600,
                    borderRadius: 4,
                    minWidth: 220,
                  }}
                >
                  Login / Register
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
