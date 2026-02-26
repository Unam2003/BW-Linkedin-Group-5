import { useEffect, useState, useCallback, useMemo } from "react"
import { Alert, Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap"
import { getMyProfile } from "../../../api"
import ProfileHeader from "./ProfileHeader"
import ExperienceSection from "./ExperienceSection"
import LocalSections from "./LocalSections"

function normalizeKeyPart(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
}

// creo un hook per salvare/leggere JSON in localStorage
function useJsonLocalStorageState(key, fallback) {
  // leggo subito da localStorage solo una volta all’inizio
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch (e) {
      console.warn("localStorage read error:", e)
      return fallback
    }
  })

  // rileggo quando cambia la key
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      setValue(raw ? JSON.parse(raw) : fallback)
    } catch (e) {
      console.warn("localStorage read error:", e)
      setValue(fallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // salvo ogni volta che value cambia
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn("localStorage non disponibile:", e)
    }
  }, [key, value])

  return [value, setValue]
}

// gestisco la parte centrale del PROFILO: header + sezioni + esperienza (locale per utente)
const ProfileMain = function () {
  // tengo profilo (header da API)
  const [me, setMe] = useState(null)

  // gestisco loading/error
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // leggo l'utente registrato locale (creato nella tua pagina Registration)
  // NB: lo tengo in state e lo rileggo anche se cambia il localStorage
  const [utenteRegistrato, setUtenteRegistrato] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("utenteRegistrato") || "null")
    } catch (e) {
      console.warn("utenteRegistrato parse error:", e)
      return null
    }
  })

  // se il localStorage cambia (es. registro un nuovo account / cambio dati), aggiorno lo state
  useEffect(() => {
    const read = () => {
      try {
        setUtenteRegistrato(JSON.parse(localStorage.getItem("utenteRegistrato") || "null"))
      } catch {
        setUtenteRegistrato(null)
      }
    }

    // cambia solo tra tab diverse, ma è comunque utile
    const onStorage = (e) => {
      if (e?.key === "utenteRegistrato") read()
    }

    window.addEventListener("storage", onStorage)
    // utile nello stesso tab (storage event non scatta nello stesso tab)
    window.addEventListener("utenteRegistratoUpdated", read)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("utenteRegistratoUpdated", read)
    }
  }, [])

  // chiave unica per l'ACCOUNT ATTIVO
  const activeAccountKey = useMemo(() => {
    const raw = me?.email || me?.username || me?._id || utenteRegistrato?.email || utenteRegistrato?.username || "guest"
    return normalizeKeyPart(raw)
  }, [me?.email, me?.username, me?._id, utenteRegistrato?.email, utenteRegistrato?.username])

  // base key comune per TUTTE le sezioni locali 
  const keyBase = `li_${activeAccountKey}`

  // esperienza ORA locale per utente 
  const [experiences, setExperiences] = useJsonLocalStorageState(`${keyBase}_experiences`, [])

  // tengo le sezioni locali personalizzabili in localStorage
  const [education, setEducation] = useJsonLocalStorageState(`${keyBase}_education`, [])
  const [skills, setSkills] = useJsonLocalStorageState(`${keyBase}_skills`, [])
  const [languages, setLanguages] = useJsonLocalStorageState(`${keyBase}_languages`, [])
  const [interests, setInterests] = useJsonLocalStorageState(`${keyBase}_interests`, [])

  // tengo About in localStorage + modal
  const [about, setAbout] = useJsonLocalStorageState(`${keyBase}_about`, "")
  const [showAboutModal, setShowAboutModal] = useState(false)

  // uso la bio API come default solo se il localStorage è vuoto
  useEffect(() => {
    if (me?.bio) {
      setAbout((prev) => prev || me.bio)
    }
  }, [me?.bio, keyBase, setAbout])

  // se l'utente si è registrato localmente, uso il campo "about" come default della sezione Informazioni
  useEffect(() => {
    const aboutRegistrazione = utenteRegistrato?.about?.trim()
    if (aboutRegistrazione) {
      setAbout((prev) => prev || aboutRegistrazione)
    }
  }, [utenteRegistrato, keyBase, setAbout])

  // carico solo il profilo header dal token
  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError("")

      const profile = await getMyProfile()
      setMe(profile)
    } catch (e) {
      setError(e?.message || "Errore nel caricamento. Controlla il token in src/api.js")
    } finally {
      setLoading(false)
    }
  }, [])

  // avvio il load al mount
  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="d-flex flex-column gap-3">
      {error && (
        <Alert variant="danger" className="rounded-4">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-muted d-flex align-items-center gap-2">
          <Spinner size="sm" /> Caricamento profilo...
        </div>
      ) : (
        me && (
          <>
            <ProfileHeader profile={me} />
            <AnalyticsCard />
            <AboutCard bio={about} onEdit={() => setShowAboutModal(true)} />
            <ActivityCard />

            {/* Esperienza personalizzata per utente localStorage */}
            <ExperienceSection experiences={experiences} setExperiences={setExperiences} />

            <LocalSections
              education={education}
              setEducation={setEducation}
              skills={skills}
              setSkills={setSkills}
              languages={languages}
              setLanguages={setLanguages}
              interests={interests}
              setInterests={setInterests}
            />
          </>
        )
      )}

      <AboutModal
        show={showAboutModal}
        onHide={() => setShowAboutModal(false)}
        value={about}
        onSave={(val) => {
          setAbout(val)
          setShowAboutModal(false)
        }}
      />
    </div>
  )
}

function AnalyticsCard() {
  return (
    <Card className="rounded-4">
      <Card.Body>
        <h5 className="m-0">Analisi</h5>
        <div className="text-muted" style={{ fontSize: 14 }}>
          Solo per te
        </div>

        <Row className="mt-3 g-3">
          <Col md={4}>
            <div className="p-3 border rounded-3 h-100">
              <div className="fw-semibold">1</div>
              <div className="text-muted" style={{ fontSize: 14 }}>
                visualizzazione del profilo
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-3 border rounded-3 h-100">
              <div className="fw-semibold">0</div>
              <div className="text-muted" style={{ fontSize: 14 }}>
                impressioni dei post
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-3 border rounded-3 h-100">
              <div className="fw-semibold">0</div>
              <div className="text-muted" style={{ fontSize: 14 }}>
                ricerche
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

function AboutCard({ bio, onEdit }) {
  return (
    <Card className="rounded-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="m-0">Informazioni</h5>
          <Button size="sm" variant="outline-secondary" onClick={onEdit}>
            <i className="bi bi-pencil me-1"></i>
            Modifica
          </Button>
        </div>

        <div className="mt-3" style={{ whiteSpace: "pre-wrap" }}>
          {bio?.trim() ? bio : <span className="text-muted">Nessuna descrizione. Clicca “Modifica” per aggiungerla.</span>}
        </div>
      </Card.Body>
    </Card>
  )
}

function ActivityCard() {
  return (
    <Card className="rounded-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="m-0">Attività</h5>
          <Button size="sm" variant="primary" className="rounded-pill">
            Crea un post
          </Button>
        </div>
        <div className="text-muted mt-2">0 follower</div>
        <div className="mt-3 text-muted">Non hai ancora pubblicato nulla.</div>
      </Card.Body>
    </Card>
  )
}

function AboutModal({ show, onHide, value, onSave }) {
  const [text, setText] = useState("")

  const reset = () => {
    setText(value || "")
  }

  const save = () => {
    onSave(text)
  }

  return (
    <Modal show={show} onHide={onHide} onShow={reset} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Informazioni</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Descrizione</Form.Label>
            <Form.Control as="textarea" rows={5} value={text} onChange={(e) => setText(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Annulla
        </Button>
        <Button variant="primary" onClick={save}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProfileMain
