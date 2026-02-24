import { useState } from "react"
import { Alert, Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import { createExperience, deleteExperience, updateExperience, uploadExperiencePicture } from "../../../api"

function ExperienceSection({ userId, experiences, onRefresh }) {
  // gestisco apertura modal e modalità edit/add
  const [showModal, setShowModal] = useState(false)
  const [editExp, setEditExp] = useState(null)

  // apro il modal in modalità “aggiungi”
  const openAdd = () => {
    if (!userId) return
    setEditExp(null)
    setShowModal(true)
  }

  // apro il modal in modalità “modifica”
  const openEdit = (exp) => {
    setEditExp(exp)
    setShowModal(true)
  }

  // chiudo e ricarico dopo un salvataggio
  const onSavedExperience = async () => {
    setShowModal(false)
    setEditExp(null)
    await onRefresh()
  }

  // elimino un’esperienza dopo conferma
  const onDelete = async (expId) => {
    if (!userId) return
    const ok = confirm("Vuoi eliminare questa esperienza?")
    if (!ok) return

    try {
      await deleteExperience(userId, expId)
      await onRefresh()
    } catch (e) {
      alert(e?.message || "Errore eliminazione")
    }
  }

  return (
    <>
      <Card className="rounded-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="m-0">Esperienza</h5>
            <Button size="sm" variant="outline-secondary" onClick={openAdd} disabled={!userId}>
              <i className="bi bi-plus-lg me-1"></i>
              Aggiungi
            </Button>
          </div>

          {/* stampo la lista esperienze */}
          <div className="mt-3 d-flex flex-column gap-3">
            {experiences.length === 0 ? (
              <div className="text-muted">Nessuna esperienza. Aggiungine una.</div>
            ) : (
              experiences.map((exp) => <ExperienceItem key={exp._id} exp={exp} onEdit={() => openEdit(exp)} onDelete={() => onDelete(exp._id)} />)
            )}
          </div>
        </Card.Body>
      </Card>

      {/* uso lo stesso modal per add/edit */}
      <ExperienceModal show={showModal} onHide={() => setShowModal(false)} userId={userId} exp={editExp} onSaved={onSavedExperience} />
    </>
  )
}

function ExperienceItem({ exp, onEdit, onDelete }) {
  // preparo le date per mostrarle bene
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

          {/* metto i bottoni edit/delete */}
          <div className="d-flex gap-2">
            <Button size="sm" variant="outline-secondary" onClick={onEdit}>
              <i className="bi bi-pencil"></i>
            </Button>
            <Button size="sm" variant="outline-danger" onClick={onDelete}>
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        </div>

        {/* mostro la descrizione se c’è */}
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

function ExperienceModal({ show, onHide, userId, exp, onSaved }) {
  // capisco se sto modificando o aggiungendo
  const isEdit = Boolean(exp?._id)

  // tengo i campi del form
  const [role, setRole] = useState("")
  const [company, setCompany] = useState("")
  const [area, setArea] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)

  // gestisco saving/error
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState("")

  // riempio i campi quando apro il modal
  const reset = () => {
    setErr("")
    setRole(exp?.role || "")
    setCompany(exp?.company || "")
    setArea(exp?.area || "")
    setStartDate(exp?.startDate ? exp.startDate.slice(0, 10) : "")
    setEndDate(exp?.endDate ? exp.endDate.slice(0, 10) : "")
    setDescription(exp?.description || "")
    setFile(null)
  }

  // salvo: prima i dati, poi se c’è l’immagine
  const save = async () => {
    if (!userId) return

    // valido i campi minimi
    if (!role.trim() || !company.trim() || !startDate) {
      setErr("Compila almeno: ruolo, azienda e data inizio")
      return
    }

    try {
      setSaving(true)
      setErr("")

      // preparo il payload per l’API
      const payload = {
        role: role.trim(),
        company: company.trim(),
        area: area.trim(),
        startDate,
        endDate: endDate || null,
        description,
      }

      // scelgo tra create o update
      let saved
      if (isEdit) saved = await updateExperience(userId, exp._id, payload)
      else saved = await createExperience(userId, payload)

      // carico l’immagine solo dopo che ho l’id giusto
      if (file) await uploadExperiencePicture(userId, saved._id, file)

      // avviso il parent e chiudo
      onSaved()
    } catch (e) {
      setErr(e?.message || "Errore salvataggio")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} onShow={reset} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Modifica esperienza" : "Aggiungi esperienza"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <Alert variant="danger">{err}</Alert>}

        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Ruolo *</Form.Label>
            <Form.Control value={role} onChange={(e) => setRole(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Azienda *</Form.Label>
            <Form.Control value={company} onChange={(e) => setCompany(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Area</Form.Label>
            <Form.Control value={area} onChange={(e) => setArea(e.target.value)} />
          </Form.Group>

          <Row className="g-2">
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Data inizio *</Form.Label>
                <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Data fine</Form.Label>
                <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-2">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
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
