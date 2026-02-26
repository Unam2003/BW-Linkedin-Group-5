import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { updateMyProfile } from "../../api"

export default function Registration() {
  const navigate = useNavigate()

  const CHIAVE_UTENTE_REGISTRATO = "utenteRegistrato"
  const CHIAVE_MOSTRA_ACCOUNT_SALVATO = "mostraAccountSalvato"
  const CHIAVE_UTENTE_LOGGATO = "utenteLoggato"

  const salvaUtenteNelLocalStorage = (datiUtente) => {
    localStorage.setItem(CHIAVE_UTENTE_REGISTRATO, JSON.stringify(datiUtente))
    localStorage.setItem(CHIAVE_MOSTRA_ACCOUNT_SALVATO, "true")
    // notifico il resto dell'app che l'account è cambiato
    window.dispatchEvent(new Event("utenteRegistratoUpdated"))
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

  const [loading, setLoading] = useState(false)
  const [errore, setErrore] = useState("")

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrore("")

    try {
      // 1) Preparo i dati per l'API 
      const payloadApi = {
        name: form.name.trim(),
        surname: form.surname.trim(),
        email: form.email.trim(),
        username: form.username.trim(),
        title: form.title.trim(),
        bio: form.about.trim(),
        area: form.area.trim(),
      }

      // 2) Aggiorno il profilo legato al token
      await updateMyProfile(payloadApi)

      // 3) Salvo anche localmente
      salvaUtenteNelLocalStorage(form)

      // 4) Login automatico
      localStorage.setItem(CHIAVE_UTENTE_LOGGATO, "true")

      // 5) Vai in home
      navigate("/", { replace: true })
    } catch (err) {
      console.error("Errore aggiornamento profilo:", err)

      // salvo comunque in locale per non bloccare l'utente
      salvaUtenteNelLocalStorage(form)
      localStorage.setItem(CHIAVE_UTENTE_LOGGATO, "true")

      setErrore("Profilo API non aggiornato, ma registrazione salvata localmente.")
      navigate("/", { replace: true })
    } finally {
      setLoading(false)
    }
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
              <Form.Control required placeholder="Name" value={form.name} onChange={handleChange("name")} />
              <Form.Control required placeholder="Surname" value={form.surname} onChange={handleChange("surname")} />
              <Form.Control required type="email" placeholder="Email address" value={form.email} onChange={handleChange("email")} />
              <Form.Control required placeholder="Username" value={form.username} onChange={handleChange("username")} />
              <Form.Control required type="password" placeholder="Password" value={form.password} onChange={handleChange("password")} />
              <Form.Control placeholder="Job Title" value={form.title} onChange={handleChange("title")} />
              <Form.Control as="textarea" rows={5} placeholder="About" value={form.about} onChange={handleChange("about")} />
              <Form.Control placeholder="Town, Region, Country" value={form.area} onChange={handleChange("area")} />

              {errore && <div className="text-danger small mt-1">{errore}</div>}

              <div className="d-flex justify-content-center mt-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 border-0"
                  style={{
                    backgroundColor: "#00E676",
                    color: "black",
                    fontWeight: 600,
                    borderRadius: 4,
                    minWidth: 220,
                  }}
                >
                  {loading ? "Salvataggio..." : "Login / Register"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
