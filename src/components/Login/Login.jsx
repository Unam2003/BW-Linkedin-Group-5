import { useState } from "react"
import { Container, Card, Button, Form, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const CHIAVE_UTENTE_LOGGATO = "utenteLoggato"

  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // ✅ login finto
    localStorage.setItem(CHIAVE_UTENTE_LOGGATO, "true")
    navigate("/", { replace: true })
  }

  return (
    <div className="bg-white min-vh-100 d-flex align-items-center">
      <Container className="py-5 d-flex justify-content-center">
        <div style={{ width: 380, maxWidth: "100%" }}>
          <Card className="border-0">
            <Card.Body className="p-0">
              <h1 className="fw-semibold mb-3" style={{ fontSize: 38 }}>
                Accedi
              </h1>

              <Form onSubmit={handleSubmit}>
                <Form.Control className="py-2" placeholder="Email o telefono" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} />

                <InputGroup className="mt-3">
                  <Form.Control
                    className="py-2"
                    type={showPwd ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="button" variant="link" className="text-decoration-none fw-semibold" onClick={() => setShowPwd((v) => !v)}>
                    {showPwd ? "Nascondi" : "Mostra"}
                  </Button>
                </InputGroup>

                <Button type="submit" className="w-100 rounded-pill py-3 mt-3 fw-semibold" style={{ backgroundColor: "#0a66c2", borderColor: "#0a66c2" }}>
                  Accedi
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}
