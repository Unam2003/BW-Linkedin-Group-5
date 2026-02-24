import { Button, Card } from "react-bootstrap"

function ProfileHeader({ profile }) {
  // creo il nome completo in modo “sicuro”
  const fullName = `${profile.name || ""} ${profile.surname || ""}`.trim()

  return (
    <Card className="rounded-4 overflow-hidden">
      {/* creo una copertina finta */}
      <div
        style={{
          height: 140,
          background: "linear-gradient(90deg, #c7d2d9 0%, #dfe7eb 50%, #c7d2d9 100%)",
        }}
      />

      <Card.Body style={{ paddingTop: 0 }}>
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex gap-3">
            {/* mostro l’avatar */}
            <img
              src={profile.image || "https://placehold.co/120x120"}
              alt="avatar"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid white",
                marginTop: -60,
              }}
            />
            <div className="pt-2">
              <h4 className="m-0">{fullName}</h4>
              <div className="text-muted">{profile.title}</div>
              <div className="text-muted" style={{ fontSize: 14 }}>
                {profile.area} · <span className="text-primary">Contatti</span>
              </div>
              <div className="text-muted" style={{ fontSize: 14 }}>
                {profile.email}
              </div>

              {/* metto i bottoni */}
              <div className="mt-2 d-flex flex-wrap gap-2">
                <Button size="sm" variant="primary" className="rounded-pill">
                  Disponibile per
                </Button>
                <Button size="sm" variant="outline-primary" className="rounded-pill">
                  Aggiungi sezione del profilo
                </Button>
                <Button size="sm" variant="outline-secondary" className="rounded-pill">
                  Migliora profilo
                </Button>
              </div>
            </div>
          </div>

          {/* metto un box laterale (solo desktop) */}
          <div className="text-muted d-none d-md-block" style={{ fontSize: 13 }}>
            <div className="fw-semibold text-dark">{profile.area}</div>
            <div>Università / Azienda</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProfileHeader
