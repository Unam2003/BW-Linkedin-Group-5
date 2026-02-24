import { useState } from "react"
import { Alert, Button, Card, Form, Modal } from "react-bootstrap"

function LocalSections({ education, setEducation, skills, setSkills, languages, setLanguages, interests, setInterests }) {
  // gestisco i 4 modali e l’elemento in modifica se c’è
  const [showEduModal, setShowEduModal] = useState(false)
  const [editEdu, setEditEdu] = useState(null) 

  const [showSkillModal, setShowSkillModal] = useState(false)
  const [editSkill, setEditSkill] = useState(null) 

  const [showLangModal, setShowLangModal] = useState(false)
  const [editLang, setEditLang] = useState(null) 

  const [showInterestModal, setShowInterestModal] = useState(false)
  const [editInterest, setEditInterest] = useState(null) 

  return (
    <>
      {/* gestisco la sezione FORMAZIONE */}
      <Card className="rounded-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Formazione</h5>

            {/* apro il modal in add */}
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => {
                setEditEdu(null)
                setShowEduModal(true)
              }}
            >
              <i className="bi bi-plus-lg me-1"></i>Aggiungi
            </Button>
          </div>

          <hr />

          {/* mostro lista o testo vuoto */}
          {education.length === 0 ? (
            <div className="text-muted">Nessuna formazione.</div>
          ) : (
            education.map((e, idx) => (
              <div key={idx} className="d-flex gap-3 align-items-start">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#e9ecef",
                    flexShrink: 0,
                  }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="fw-semibold">{e.school}</div>
                      <div className="text-muted">
                        {e.degree}
                        {e.field ? `, ${e.field}` : ""}
                      </div>
                      <div className="text-muted small">{e.years}</div>
                    </div>

                    {/* modifico o elimino */}
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => {
                          setEditEdu({ index: idx, item: e })
                          setShowEduModal(true)
                        }}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          const ok = confirm("Eliminare questa formazione?")
                          if (!ok) return
                          setEducation((prev) => prev.filter((_, i) => i !== idx))
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </Card.Body>
      </Card>

      {/* gestisco la sezione COMPETENZE */}
      <Card className="rounded-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Competenze</h5>

            {/* apro il modal in add */}
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => {
                setEditSkill(null)
                setShowSkillModal(true)
              }}
            >
              <i className="bi bi-plus-lg me-1"></i>Aggiungi
            </Button>
          </div>

          <hr />

          {skills.length === 0 ? (
            <div className="text-muted">Nessuna competenza.</div>
          ) : (
            <div className="d-flex flex-column gap-2">
              {skills.map((s, idx) => (
                <div key={idx} className="d-flex justify-content-between align-items-center">
                  <div className="fw-semibold">{s}</div>

                  {/* modifico o elimino */}
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => {
                        setEditSkill({ index: idx, value: s })
                        setShowSkillModal(true)
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => {
                        const ok = confirm("Eliminare questa competenza?")
                        if (!ok) return
                        setSkills((prev) => prev.filter((_, i) => i !== idx))
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* gestisco la sezione LINGUE */}
      <Card className="rounded-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Lingue</h5>

            {/* apro il modal in add */}
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => {
                setEditLang(null)
                setShowLangModal(true)
              }}
            >
              <i className="bi bi-plus-lg me-1"></i>Aggiungi
            </Button>
          </div>

          <hr />

          {languages.length === 0 ? (
            <div className="text-muted">Nessuna lingua.</div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {languages.map((l, idx) => (
                <div key={idx} className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-semibold">{l.name}</div>
                    <div className="text-muted small">{l.level}</div>
                  </div>

                  {/* modifico o elimino */}
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => {
                        setEditLang({ index: idx, item: l })
                        setShowLangModal(true)
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => {
                        const ok = confirm("Eliminare questa lingua?")
                        if (!ok) return
                        setLanguages((prev) => prev.filter((_, i) => i !== idx))
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* gestisco la sezione HOBBY */}
      <Card className="rounded-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Hobby</h5>

            {/* apro il modal in add */}
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => {
                setEditInterest(null)
                setShowInterestModal(true)
              }}
            >
              <i className="bi bi-plus-lg me-1"></i>Aggiungi
            </Button>
          </div>

          <hr />

          {interests.length === 0 ? (
            <div className="text-muted">Nessun Hobby.</div>
          ) : (
            <div className="d-flex flex-wrap gap-3">
              {interests.map((it, idx) => (
                <div key={idx} className="d-flex gap-2 align-items-center" style={{ minWidth: 260 }}>
                  <img src={it.logo || "https://placehold.co/40x40"} alt={it.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
                  <div>
                    <div className="fw-semibold">{it.name}</div>
                    <div className="text-muted small">{it.followers}</div>
                  </div>

                  {/* modifico o elimino */}
                  <div className="ms-auto d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => {
                        setEditInterest({ index: idx, item: it })
                        setShowInterestModal(true)
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => {
                        const ok = confirm("Eliminare questo interesse?")
                        if (!ok) return
                        setInterests((prev) => prev.filter((_, i) => i !== idx))
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* gestisco i MODALI add/edit e aggiorno gli array */}
      <EducationModal
        show={showEduModal}
        onHide={() => setShowEduModal(false)}
        edit={editEdu}
        onSave={(item) => {
          setShowEduModal(false)
          if (editEdu) {
            // sostituisco l’elemento modificato
            setEducation((prev) => prev.map((x, i) => (i === editEdu.index ? item : x)))
            setEditEdu(null)
          } else {
            // aggiungo in testa
            setEducation((prev) => [item, ...prev])
          }
        }}
      />

      <SkillModal
        show={showSkillModal}
        onHide={() => setShowSkillModal(false)}
        edit={editSkill}
        onSave={(value) => {
          setShowSkillModal(false)
          if (editSkill) {
            setSkills((prev) => prev.map((x, i) => (i === editSkill.index ? value : x)))
            setEditSkill(null)
          } else {
            setSkills((prev) => [value, ...prev])
          }
        }}
      />

      <LanguageModal
        show={showLangModal}
        onHide={() => setShowLangModal(false)}
        edit={editLang}
        onSave={(item) => {
          setShowLangModal(false)
          if (editLang) {
            setLanguages((prev) => prev.map((x, i) => (i === editLang.index ? item : x)))
            setEditLang(null)
          } else {
            setLanguages((prev) => [item, ...prev])
          }
        }}
      />

      <InterestModal
        show={showInterestModal}
        onHide={() => setShowInterestModal(false)}
        edit={editInterest}
        onSave={(item) => {
          setShowInterestModal(false)
          if (editInterest) {
            setInterests((prev) => prev.map((x, i) => (i === editInterest.index ? item : x)))
            setEditInterest(null)
          } else {
            setInterests((prev) => [item, ...prev])
          }
        }}
      />
    </>
  )
}

function EducationModal({ show, onHide, edit, onSave }) {
  // capisco se sto editando
  const isEdit = Boolean(edit)

  // tengo i campi del form
  const [school, setSchool] = useState("")
  const [degree, setDegree] = useState("")
  const [field, setField] = useState("")
  const [years, setYears] = useState("")
  const [err, setErr] = useState("")

  // riempio i valori quando apro
  const reset = () => {
    setErr("")
    setSchool(edit?.item?.school || "")
    setDegree(edit?.item?.degree || "")
    setField(edit?.item?.field || "")
    setYears(edit?.item?.years || "")
  }

  // valido e poi salvo
  const save = () => {
    if (!school.trim() || !years.trim()) {
      setErr("Compila almeno: scuola e anni")
      return
    }
    onSave({ school: school.trim(), degree: degree.trim(), field: field.trim(), years: years.trim() })
  }

  return (
    <Modal show={show} onHide={onHide} onShow={reset} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Modifica formazione" : "Aggiungi formazione"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <Alert variant="danger">{err}</Alert>}
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Scuola *</Form.Label>
            <Form.Control value={school} onChange={(e) => setSchool(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Titolo di studio</Form.Label>
            <Form.Control value={degree} onChange={(e) => setDegree(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control value={field} onChange={(e) => setField(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Anni *</Form.Label>
            <Form.Control value={years} onChange={(e) => setYears(e.target.value)} placeholder="es. 2015 – 2021" />
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

function SkillModal({ show, onHide, edit, onSave }) {
  const isEdit = Boolean(edit)
  const [value, setValue] = useState("")
  const [err, setErr] = useState("")

  // carico il valore quando apro
  const reset = () => {
    setErr("")
    setValue(edit?.value || "")
  }

  // valido e salvo
  const save = () => {
    if (!value.trim()) {
      setErr("Inserisci una competenza")
      return
    }
    onSave(value.trim())
  }

  return (
    <Modal show={show} onHide={onHide} onShow={reset} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Modifica competenza" : "Aggiungi competenza"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <Alert variant="danger">{err}</Alert>}
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Competenza *</Form.Label>
            <Form.Control value={value} onChange={(e) => setValue(e.target.value)} />
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

function LanguageModal({ show, onHide, edit, onSave }) {
  const isEdit = Boolean(edit)

  const [name, setName] = useState("")
  const [level, setLevel] = useState("")
  const [err, setErr] = useState("")

  // carico i valori quando apro
  const reset = () => {
    setErr("")
    setName(edit?.item?.name || "")
    setLevel(edit?.item?.level || "")
  }

  // valido e salvo
  const save = () => {
    if (!name.trim() || !level.trim()) {
      setErr("Compila lingua e livello")
      return
    }
    onSave({ name: name.trim(), level: level.trim() })
  }

  return (
    <Modal show={show} onHide={onHide} onShow={reset} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Modifica lingua" : "Aggiungi lingua"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <Alert variant="danger">{err}</Alert>}
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Lingua *</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Livello *</Form.Label>
            <Form.Control value={level} onChange={(e) => setLevel(e.target.value)} placeholder="es. Conoscenza base" />
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

function InterestModal({ show, onHide, edit, onSave }) {
  const isEdit = Boolean(edit)

  const [name, setName] = useState("")
  const [followers, setFollowers] = useState("")
  const [logo, setLogo] = useState("")
  const [err, setErr] = useState("")

  // carico i valori quando apro
  const reset = () => {
    setErr("")
    setName(edit?.item?.name || "")
    setFollowers(edit?.item?.followers || "")
    setLogo(edit?.item?.logo || "")
  }

  // valido e salvo
  const save = () => {
    if (!name.trim()) {
      setErr("Inserisci un nome interesse")
      return
    }
    onSave({ name: name.trim(), followers: followers.trim(), logo: logo.trim() })
  }

  return (
    <Modal show={show} onHide={onHide} onShow={reset} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Modifica interesse" : "Aggiungi Hobby"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <Alert variant="danger">{err}</Alert>}
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Nome *</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Logo (URL)</Form.Label>
            <Form.Control value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="https://..." />
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

export default LocalSections
