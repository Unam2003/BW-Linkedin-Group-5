import { useState, useEffect, useCallback } from "react";
import { Form, Button, ListGroup, Alert } from "react-bootstrap";
import { getComments, createComment, deleteComment } from "../../../api";

const CommentArea = function ({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const loadComments = useCallback(() => {
    getComments(postId)
      .then((data) => {
        console.log("Commenti recuperati", data);
        setComments(data);
      })
      .catch((err) => {
        console.log("Errore nel recupero", err);
      });
  }, [postId]);

  useEffect(() => {
    // Quando cambia il postId, ricarico i commenti del post
    loadComments();
  }, [loadComments]);

  // Qui invio un nuovo commento
  const submitComment = (e) => {
    e.preventDefault();

    const nuovoCommento = {
      comment: text,
      rate: "5",
      elementId: postId,
    };

    createComment(nuovoCommento)
      .then((data) => {
        console.log("Commento inviato", data);
        setText("");
        // Dopo l'invio aggiorno subito la lista dei commenti
        loadComments();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1500);
      })
      .catch((err) => {
        console.log("Errore nell'invio", err);
      });
  };

  // Qui elimino un commento e poi ricarico la lista
  const handleDelete = (commentId) => {
    if (window.confirm("Vuoi davvero eliminare questo commento?")) {
      deleteComment(commentId)
        .then(() => {
          console.log("Commento eliminato con successo");
          loadComments();
        })
        .catch((err) => {
          console.log("Errore nella cancellazione", err);
          alert("Non puoi eliminare questo commento (forse non l'hai scritto tu?)");
        });
    }
  };

  return (
    <div className="mt-3">
      {showSuccess && (
        <Alert variant="success" className="py-2 small text-center">
          Commento inviato con successo!
        </Alert>
      )}

      <Form onSubmit={submitComment} className="d-flex gap-2 mb-3">
        <Form.Control placeholder="Scrivi un commento..." value={text} onChange={(e) => setText(e.target.value)} className="rounded-pill" />
        <Button type="submit" variant="primary" size="sm">
          Invia
        </Button>
      </Form>

      <ListGroup>
        {comments.map((c) => (
          <ListGroup.Item key={c._id} className="border-0 p-1">
            <div className="bg-light rounded p-2">
              <div className="fw-bold small">{c.author}</div>
              <div className="small">{c.comment}</div>
            </div>

            <Button variant="link" className="text-danger p-0 ms-2" onClick={() => handleDelete(c._id)}>
              <i className="bi bi-trash3"></i>
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CommentArea;
