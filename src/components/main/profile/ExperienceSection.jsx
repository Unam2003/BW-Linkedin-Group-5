import { useEffect, useState } from "react"
import { Alert, Button, Card, Col, Form, Modal, Row } from "react-bootstrap"

// ordino le esperienze dalla più recente alla più vecchia 
function normalizeAndSort(list) {
  return [...list].sort((a, b) => {
    const da = a?.startDate ? new Date(a.startDate).getTime() : 0
    const db = b?.startDate ? new Date(b.startDate).getTime() : 0
    return db - da
  })
}

// creo un id locale se non ho un _id dal backend
function makeLocalId() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID()
    }
  } catch {
    // ignoro l'errore e uso il fallback sotto
  }

  return `exp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

// converto un file immagine in base64, così posso salvarlo localmente
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("")
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      resolve(typeof reader.result === "string" ? reader.result : "")
    }

    reader.onerror = () => {
      reject(new Error("Errore lettura immagine"))
    }

    reader.readAsDataURL(file)
  })
}

// preparo i valori iniziali del form 
function getInitialForm(exp) {
  return {
    role: exp?.role || "",
    company: exp?.company || "",
    area: exp?.area || "",
    startDate: exp?.startDate ? String(exp.startDate).slice(0, 10) : "",
    endDate: exp?.endDate ? String(exp.endDate).slice(0, 10) : "",
    description: exp?.description || "",
  }
}

function ExperienceSection({ experiences = [], setExperiences }) {
  const [showModal, setShowModal] = useState(false)
  const [editExp, setEditExp] = useState(null)

  // apro il modal in modalità aggiunta
  const openAdd = () => {
    setEditExp(null)
    setShowModal(true)
  }

  // apro il modal in modalità modifica
  const openEdit = (exp) => {
    setEditExp(exp)
    setShowModal(true)
  }

  // aggiorno la lista quando salvo
  const onSavedExperience = (savedExp) => {
    setExperiences((prev) => {
      const exists = prev.some((x) => x._id === savedExp._id)

      const next = exists ? prev.map((x) => (x._id === savedExp._id ? savedExp : x)) : [savedExp, ...prev]

      return normalizeAndSort(next)
    })

    setShowModal(false)
    setEditExp(null)
  }

  // elimino un'esperienza dopo conferma
  const onDelete = (expId) => {
    const ok = window.confirm("Vuoi eliminare questa esperienza?")
    if (!ok) return

    setExperiences((prev) => prev.filter((x) => x._id !== expId))
  }

  return (
    <>
      <Card className="rounded-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="m-0">Esperienza</h5>

            <Button size="sm" variant="outline-secondary" onClick={openAdd}>
              <i className="bi bi-plus-lg me-1"></i>
              Aggiungi
            </Button>
          </div>

          <div className="mt-3 d-flex flex-column gap-3">
            {experiences.length === 0 ? (
              <div className="text-muted">Nessuna esperienza. Aggiungine una.</div>
            ) : (
              experiences.map((exp, idx) => <ExperienceItem key={exp._id || idx} exp={exp} onEdit={() => openEdit(exp)} onDelete={() => onDelete(exp._id)} />)
            )}
          </div>
        </Card.Body>
      </Card>

      <ExperienceModal show={showModal} onHide={() => setShowModal(false)} exp={editExp} onSaved={onSavedExperience} />
    </>
  )
}

function ExperienceItem({ exp, onEdit, onDelete }) {
  const start = exp.startDate ? new Date(exp.startDate) : null
  const end = exp.endDate ? new Date(exp.endDate) : null

  return (
    <div className="d-flex gap-3">
      <img
        src={exp.image || "https://placehold.co/56x56"}
        alt="company"
        style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          objectFit: "cover",
        }}
      />

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="fw-semibold">{exp.role}</div>
            <div>{exp.company}</div>

            <div className="text-muted" style={{ fontSize: 14 }}>
              {start ? start.toLocaleDateString() : ""} - {end ? end.toLocaleDateString() : "Presente"}
              {exp.area ? ` · ${exp.area}` : ""}
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button size="sm" variant="outline-secondary" onClick={onEdit}>
              <i className="bi bi-pencil"></i>
            </Button>

            <Button size="sm" variant="outline-danger" onClick={onDelete}>
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        </div>

        {exp.description && (
          <div className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
            {exp.description}
          </div>
        )}

        <hr className="my-3" />
      </div>
    </div>
  )
}

function ExperienceModal({ show, onHide, exp, onSaved }) {
  const isEdit = Boolean(exp?._id)

  // tengo tutti i campi del form in un solo state, così il codice è più semplice
  const [form, setForm] = useState(getInitialForm(exp))
  const [file, setFile] = useState(null)

  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState("")

  // aggiorno il form ogni volta che apro il modal o cambio esperienza da modificare
  useEffect(() => {
    if (show) {
      setForm(getInitialForm(exp))
      setFile(null)
      setErr("")
    }
  }, [show, exp])

  // aggiorno un campo del form in modo generico
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // salvo (aggiungo o modifico) mantenendo le stesse funzionalità
  const save = async () => {
    if (!form.role.trim() || !form.company.trim() || !form.startDate) {
      setErr("Compila almeno: ruolo, azienda e data inizio")
      return
    }

    try {
      setSaving(true)
      setErr("")

      let image = exp?.image || ""

      // Se scelgo un nuovo file, lo converto in base64
      if (file) {
        image = await readFileAsDataUrl(file)
      }

      const payload = {
        _id: exp?._id || makeLocalId(),
        role: form.role.trim(),
        company: form.company.trim(),
        area: form.area.trim(),
        startDate: form.startDate,
        endDate: form.endDate || null,
        description: form.description,
        image,
      }

      onSaved(payload)
    } catch (e) {
      setErr(e?.message || "Errore salvataggio")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Modifica esperienza" : "Aggiungi esperienza"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {err && <Alert variant="danger">{err}</Alert>}

        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Ruolo *</Form.Label>
            <Form.Control name="role" value={form.role} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Azienda *</Form.Label>
            <Form.Control name="company" value={form.company} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Area</Form.Label>
            <Form.Control name="area" value={form.area} onChange={handleChange} />
          </Form.Group>

          <Row className="g-2">
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Data inizio *</Form.Label>
                <Form.Control type="date" name="startDate" value={form.startDate} onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Data fine</Form.Label>
                <Form.Control type="date" name="endDate" value={form.endDate} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-2">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Immagine (opzionale)</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Annulla
        </Button>

        <Button variant="primary" onClick={save} disabled={saving}>
          {saving ? "Salvo..." : "Salva"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ExperienceSection
