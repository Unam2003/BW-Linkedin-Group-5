import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { createPost, uploadPostImage } from "../../../api"

function PostComposer({ username, onCreated, disabled }) {
  // tengo testo, file e stato salvataggio
  const [text, setText] = useState("")
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState("")

  // gestisco l'invio del post
  const submit = async (e) => {
    e.preventDefault()

    // blocco se è vuoto o disabilitato
    if (!text.trim() || disabled) return

    try {
      // entro in modalità “pubblico”
      setSaving(true)
      setErr("")

      // creo prima il post (così ottengo l'id)
      const created = await createPost({
        text: text.trim(),
        username,
      })

      // carico l'immagine solo se l'utente l'ha scelta
      if (file) {
        await uploadPostImage(created._id, file)
      }

      // pulisco il form e chiedo al parent di ricaricare
      setText("")
      setFile(null)
      onCreated()
    } catch (e2) {
      // mostro un errore leggibile
      setErr(e2?.message || "Errore durante la pubblicazione")
    } finally {
      // esco dalla modalità “pubblico”
      setSaving(false)
    }
  }

  return (
    <Form onSubmit={submit}>
      {/* scrivo il testo */}
      <Form.Control
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Avvia un post..."
        className="rounded-pill"
        disabled={saving || disabled}
      />

      <div className="d-flex justify-content-between align-items-center mt-2">
        {/* scelgo un file immagine */}
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={saving || disabled}
          style={{ maxWidth: 250 }}
        />

        {/* invio */}
        <Button size="sm" type="submit" disabled={saving || disabled || !text.trim()}>
          {saving ? "Pubblico..." : "Pubblica"}
        </Button>
      </div>

      {/* mostro l'errore sotto */}
      {err && <div className="text-danger small mt-2">{err}</div>}
    </Form>
  )
}

export default PostComposer
