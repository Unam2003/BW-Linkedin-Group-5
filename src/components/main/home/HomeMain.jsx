import { useEffect, useMemo, useState } from "react"
import { Alert, Button, Card, Spinner } from "react-bootstrap"
import { getMyProfile, getPosts } from "../../../api"
import PostComposer from "./PostComposer"
import PostCard from "./PostCard"

// gestisco la parte centrale della HOME: box per scrivere + feed dei post
const HomeMain = function () {
  // salvo il mio profilo
  const [me, setMe] = useState(null)
  // salvo la lista dei post
  const [posts, setPosts] = useState([])
  // gestisco loading/error
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // carico profilo + post
  const load = async () => {
    try {
      // riparto sempre pulito
      setLoading(true)
      setError("")

      // chiamo profilo e post in parallelo (più veloce)
      const [profile, allPosts] = await Promise.all([getMyProfile(), getPosts()])
      setMe(profile)

      // ordino i post dal più recente
      const sorted = [...allPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setPosts(sorted)
    } catch (e) {
      // mostro l’errore 
      setError(e?.message || "Errore nel caricamento. Controlla il token in src/api.js")
    } finally {
      // spengo il loading in ogni caso
      setLoading(false)
    }
  }

  // carico tutto appena la pagina parte
  useEffect(() => {
    load()
  }, [])

  // decido se posso pubblicare 
  const canPost = useMemo(() => Boolean(me?.username), [me])

  return (
    <div className="d-flex flex-column gap-3">
      {/* mostro il box per creare un post */}
      <Card className="rounded-4">
        <Card.Body>
          <div className="d-flex gap-2 align-items-start">
            <img
              src={me?.image || "https://placehold.co/48x48"}
              alt="me"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div className="flex-grow-1">
              {/* passo onCreated=load così dopo la pubblicazione ricarico il feed */}
              <PostComposer disabled={!canPost} username={me?.username || "me"} onCreated={load} />

              {/* avviso se non posso postare (token mancante/401) */}
              {!canPost && (
                <div className="text-muted small mt-2">
                  Per pubblicare serve il profilo: se vedi 401, incolla il token in <b>src/api.js</b>.
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* metto titolo feed + bottone refresh */}
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="m-0">Feed</h6>
        <Button size="sm" variant="outline-secondary" onClick={load} disabled={loading}>
          Aggiorna
        </Button>
      </div>

      {/* mostro eventuale errore */}
      {error && (
        <Alert variant="danger" className="rounded-4">
          {error}
        </Alert>
      )}

      {/* scelgo tra spinner o lista post */}
      {loading ? (
        <div className="text-muted d-flex align-items-center gap-2">
          <Spinner size="sm" /> Caricamento...
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {/* limito a 20 post per non appesantire */}
          {posts.slice(0, 20).map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomeMain
