import { Card } from "react-bootstrap";
import { useState } from "react";
import CommentArea from "./CommentArea";

function PostCard({ post }) {
  // trasformo createdAt in una data leggibile
  const date = new Date(post.createdAt);
  const [showComments, setShowComments] = useState(false);

  return (
    <Card className="rounded-4">
      <Card.Body>
        {/* mostro info utente */}
        <div className="d-flex gap-2 align-items-center">
          <img
            src={post.user?.image || "https://placehold.co/40x40"}
            alt="user"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <div className="fw-semibold">{post.user?.name ? `${post.user.name} ${post.user.surname || ""}` : post.username || "Utente"}</div>
            <div className="text-muted small">{date.toLocaleString()}</div>
          </div>
        </div>

        {/* mostro testo del post */}
        <div className="mt-3" style={{ whiteSpace: "pre-wrap" }}>
          {post.text}
        </div>

        {/* mostro immagine se presente */}
        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="mt-3"
            style={{
              width: "100%",
              borderRadius: 12,
              objectFit: "cover",
            }}
          />
        )}

        {/* metto i bottoni */}
        <hr className="my-3" />
        <div className="d-flex justify-content-between text-muted">
          <button className="btn btn-sm btn-light w-100 me-2">
            <i className="bi bi-hand-thumbs-up me-1"></i>Consiglia
          </button>
          <button
            onClick={() => setShowComments(!showComments)} // ho messo una funziona che cambia classe al bottone se showComments è true, così si evidenzia quando i commenti sono visibili
            className={`btn btn-sm w-100 me-2 ${showComments ? "btn-light text-primary fw-bold" : "btn-light"}`}
          >
            <i className="bi bi-chat-left-text me-1"></i>Commenta
          </button>
          <button className="btn btn-sm btn-light w-100 me-2">
            <i className="bi bi-arrow-repeat me-1"></i>Ripubblica
          </button>
          <button className="btn btn-sm btn-light w-100">
            <i className="bi bi-send me-1"></i>Invia
          </button>
        </div>
        {showComments && <CommentArea postId={post._id} />}
      </Card.Body>
    </Card>
  );
}

export default PostCard;
