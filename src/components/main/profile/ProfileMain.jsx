import { useEffect, useState, useCallback } from "react"
import { Alert, Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap"
import { getExperiences, getMyProfile } from "../../../api"
import ProfileHeader from "./ProfileHeader"
import ExperienceSection from "./ExperienceSection"
import LocalSections from "./LocalSections"

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

// gestisco la parte centrale del PROFILO: header + sezioni + esperienza (da API)
const ProfileMain = function () {
  // tengo profilo ed esperienze
  const [me, setMe] = useState(null)
  const [experiences, setExperiences] = useState([])

  // gestisco loading/error
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // creo una base key per salvare dati separati per utente
  const keyBase = `li_${me?._id || "guest"}`

  // tengo le sezioni “locali” (personalizzabili) in localStorage
  const [education, setEducation] = useJsonLocalStorageState(`${keyBase}_education`, [])
  const [skills, setSkills] = useJsonLocalStorageState(`${keyBase}_skills`, [])
  const [languages, setLanguages] = useJsonLocalStorageState(`${keyBase}_languages`, [])
  const [interests, setInterests] = useJsonLocalStorageState(`${keyBase}_interests`, [])

  // tengo “About” in localStorage + modal
  const [about, setAbout] = useJsonLocalStorageState(`${keyBase}_about`, "")
  const [showAboutModal, setShowAboutModal] = useState(false)

  // uso la bio API come default solo se il localStorage è vuoto
  useEffect(() => {
    if (me?.bio) {
      setAbout((prev) => prev || me.bio)
    }
  }, [me?.bio, setAbout])

  // carico profilo e poi esperienze
  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError("")

      // prendo il mio profilo
      const profile = await getMyProfile()
      setMe(profile)

      // prendo le esperienze solo se ho l’id
      if (profile?._id) {
        const exp = await getExperiences(profile._id)
        // ordino per data inizio (più recente)
        const sorted = [...exp].sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        setExperiences(sorted)
      } else {
        setExperiences([])
      }
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
      {/* mostro errore se c’è */}
      {error && (
        <Alert variant="danger" className="rounded-4">
          {error}
        </Alert>
      )}

      {/* scelgo tra loading e contenuto */}
      {loading ? (
        <div className="text-muted d-flex align-items-center gap-2">
          <Spinner size="sm" /> Caricamento profilo...
        </div>
      ) : (
        me && (
          <>
            {/* stampo le sezioni principali */}
            <ProfileHeader profile={me} />
            <AnalyticsCard />

            {/* passo la bio “about” salvata in localStorage */}
            <AboutCard bio={about} onEdit={() => setShowAboutModal(true)} />

            <ActivityCard />

            {/* passo userId e onRefresh=load così aggiorno dopo CRUD */}
            <ExperienceSection userId={me._id} experiences={experiences} onRefresh={load} />

            {/* passo tutte le sezioni locali e i setter */}
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

      {/* gestisco il modal About */}
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
  // mostro una card statica “Analisi”
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
  // mostro il testo “Informazioni” + tasto modifica
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
  // mostro una card statica “Attività”
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
  // tengo il testo in stato locale del modal
  const [text, setText] = useState("")

  // riempio il textarea quando apro
  const reset = () => {
    setText(value || "")
  }

  // passo su al parent il valore salvato
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
