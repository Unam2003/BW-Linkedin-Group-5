export const STRIVE_BASE_URL = "https://striveschool-api.herokuapp.com/api";
export const STRIVE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTljMTA5NTBiYzFkZTAwMTU3N2I3OWMiLCJpYXQiOjE3NzE4MzY1NTEsImV4cCI6MTc3MzA0NjE1MX0.pFUJj7PHnqKwXxAdWF6BXDIKMzUUG8GS7tsvdUNOY8o";

// preparo la stringa Authorization finale
export const STRIVE_AUTH = `Bearer ${STRIVE_TOKEN}`;

// centralizzo qui tutta la fetch, così ogni funzione è più pulita
async function request(path, options = {}) {
  // costruisco l'URL completo
  const url = `${STRIVE_BASE_URL}${path}`;

  // preparo gli headers e ci metto sempre l'Authorization
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", STRIVE_AUTH);

  // capisco se sto inviando JSON o FormData
  const body = options.body;
  const isFormData = body instanceof FormData;
  if (body && !isFormData && !headers.has("Content-Type")) {
    // dico che il body è JSON (solo se non è FormData)
    headers.set("Content-Type", "application/json");
  }

  // faccio la chiamata HTTP
  const res = await fetch(url, { ...options, headers });

  // leggo la risposta (JSON se possibile, altrimenti testo)
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : await res.text();

  // blocco tutto se la risposta non è ok
  if (!res.ok) {
    const msg = (data && typeof data === "object" && (data.message || data.error)) || (typeof data === "string" ? data : "Errore API");
    throw new Error(`${res.status} - ${msg}`);
  }

  // ritorno i dati già “pronti”
  return data;
}

// -------------------- PROFILE --------------------

// prendo il mio profilo (me)
export function getMyProfile() {
  return request("/profile/me");
}

// aggiorno il mio profilo (PUT)
export function updateMyProfile(payload) {
  return request("/profile/", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// carico l'immagine profilo (FormData)
export function uploadProfilePicture(userId, file) {
  const fd = new FormData();
  fd.append("profile", file);
  return request(`/profile/${userId}/picture`, { method: "POST", body: fd });
}

// -------------------- EXPERIENCES --------------------

// leggo le esperienze di un utente
export function getExperiences(userId) {
  return request(`/profile/${userId}/experiences`);
}

// creo una nuova esperienza
export function createExperience(userId, payload) {
  return request(`/profile/${userId}/experiences`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// modifico un’esperienza esistente
export function updateExperience(userId, expId, payload) {
  return request(`/profile/${userId}/experiences/${expId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// elimino un’esperienza (e poi ritorno true)
export async function deleteExperience(userId, expId) {
  await request(`/profile/${userId}/experiences/${expId}`, {
    method: "DELETE",
  });
  return true;
}

// carico un’immagine per l’esperienza (FormData)
export function uploadExperiencePicture(userId, expId, file) {
  const fd = new FormData();
  fd.append("experience", file);
  return request(`/profile/${userId}/experiences/${expId}/picture`, {
    method: "POST",
    body: fd,
  });
}

// -------------------- POSTS (HOME FEED) --------------------

// prendo tutti i post
export function getPosts() {
  return request("/posts");
}

// creo un post
export function createPost(payload) {
  return request("/posts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// aggiorno un post
export function updatePost(postId, payload) {
  return request(`/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// elimino un post (e poi ritorno true)
export async function deletePost(postId) {
  await request(`/posts/${postId}`, { method: "DELETE" });
  return true;
}

// carico l’immagine di un post (FormData)
export function uploadPostImage(postId, file) {
  const fd = new FormData();
  fd.append("post", file);
  return request(`/posts/${postId}`, { method: "POST", body: fd });
}

// -------------------- COMMENTS --------------------

// prendo i commenti di un post specifico
export function getComments(postId) {
  return request("/comments/").then((allComments) => {
    // Filtriamo noi i commenti che appartengono a questo post
    return allComments.filter((c) => c.elementId === postId);
  });
}

// creo un nuovo commento
export function createComment(payload) {
  return request("/comments/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// elimino un commento
export async function deleteComment(commentId) {
  await request(`/comments/${commentId}`, { method: "DELETE" });
  return true;
}
