import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Form, InputGroup, NavDropdown } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink, useNavigate } from "react-router-dom";

const CHIAVE_UTENTE_REGISTRATO = "utenteRegistrato";
const CHIAVE_UTENTE_LOGGATO = "utenteLoggato";

const leggiUtenteRegistrato = () => {
  const testo = localStorage.getItem(CHIAVE_UTENTE_REGISTRATO);
  if (!testo) return null;
  try {
    return JSON.parse(testo);
  } catch {
    return null;
  }
};

const MyNav = function () {
  // sezione notifiche della navbar
  // -----------------------------------------------------------------------------------
  const navigate = useNavigate();
  const user = leggiUtenteRegistrato();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const phrases = [
    "ha visitato il tuo profilo",
    "ha consigliato il tuo post",
    "ha commentato la tua esperienza",
    "ti ha inviato un messaggio",
    "ha pubblicato un nuovo post",
  ];

  const addNotification = () => {
    const randomName = ["Marco", "Giulia", "Luca", "Sofia", "Alessio"][Math.floor(Math.random() * 5)];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    const newNotif = {
      id: Date.now(),
      text: `${randomName} ${randomPhrase}`,
      time: "Adesso",
    };

    setNotifications((prev) => [newNotif, ...prev].slice(0, 5));
    setUnreadCount((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(addNotification, 30000);
    return () => clearInterval(interval);
  }, []);
  // ------------------------------------------------------------------------------------------

  const handleLogout = () => {
    localStorage.setItem(CHIAVE_UTENTE_LOGGATO, "false");
    navigate("/welcome", { replace: true });
  };

  return (
    <Navbar className="sticky-top bg-white border-bottom py-0" id="nav">
      <Container fluid className="px-md-5 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center flex-grow-1 flex-md-grow-0">
          <Navbar.Brand as={NavLink} to="/" className="p-0 me-2">
            <i className="bi bi-linkedin text-primary" style={{ fontSize: "30px" }}></i>
          </Navbar.Brand>

          <Form className="d-md-block">
            <InputGroup size="sm" className="rounded-5 p-1 border border-black bg-light">
              <InputGroup.Text className="bg-transparent border-0">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control type="search" placeholder="Search" className="bg-transparent border-0" />
            </InputGroup>
          </Form>
        </div>

        <Nav className="flex-row align-items-center ms-auto">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link d-flex flex-column align-items-center px-2 px-md-3 text-hover ${
                isActive ? "text-dark border-bottom border-dark border-2 border-md-0" : "text-secondary"
              }`
            }
          >
            <i className="bi bi-house-door-fill fs-5"></i>
            <span className="d-none d-md-block spanUnderIcon">Home</span>
          </NavLink>

          <NavLink as="div" className="nav-link d-flex flex-column align-items-center px-2 px-md-3 text-hover text-secondary">
            <i className="bi bi-people-fill fs-5"></i>
            <span className="d-none d-md-block spanUnderIcon">My Network</span>
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `nav-link d-flex flex-column align-items-center px-2 px-md-3 text-hover ${
                isActive ? "text-dark border-bottom border-dark border-2 border-md-0" : "text-secondary"
              }`
            }
          >
            <i className="bi bi-briefcase-fill fs-5"></i>
            <span className="d-none d-md-block spanUnderIcon">Jobs</span>
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `nav-link d-flex flex-column align-items-center px-2 px-md-3 text-hover ${
                isActive ? "text-dark border-bottom border-dark border-2 border-md-0" : "text-secondary"
              }`
            }
          >
            <i className="bi bi-chat-dots-fill fs-5"></i>
            <span className="d-none d-md-block spanUnderIcon">Messaging</span>
          </NavLink>

          <NavDropdown
            align="end"
            id="notifications-dropdown"
            onToggle={(isOpen) => isOpen && setUnreadCount(0)}
            className="no-caret"
            title={
              <div className="d-flex flex-column align-items-center text-secondary text-hover px-2 px-md-3">
                <div className="position-relative">
                  <i className="bi bi-bell-fill fs-5"></i>

                  {/* badge della notifica */}
                  {unreadCount > 0 && (
                    <span
                      className="position-absolute rounded-circle bg-danger"
                      style={{
                        top: "-2px",
                        right: "-4px",
                        width: "10px",
                        height: "10px",
                      }}
                    ></span>
                  )}
                </div>
                <span className="d-none d-md-block spanUnderIcon">Notifications</span>
              </div>
            }
          >
            <div style={{ width: "280px", maxHeight: "400px", overflowY: "auto" }}>
              <div className="px-3 py-2 fw-bold border-bottom small text-muted">Recent Notifications</div>

              {notifications.length === 0 ? (
                <div className="px-3 py-4 text-center text-muted small">
                  <i className="bi bi-bell-slash d-block mb-1 fs-5"></i>
                  No new notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <NavDropdown.Item key={n.id} className=" border-bottom py-2 ">
                    <div className="small fw-bold">{n.text}</div>
                    <div className="text-muted" style={{ fontSize: "10px" }}>
                      {n.time}
                    </div>
                  </NavDropdown.Item>
                ))
              )}
            </div>
          </NavDropdown>

          <NavDropdown
            align="end"
            className="px-2 px-md-3"
            title={
              <div className="d-inline-flex flex-column align-items-center text-secondary text-hover">
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png" alt="icon" id="me-icon" />
                <span className="d-none d-md-block spanUnderIcon">{user?.username ? user.username : "Me"}</span>{" "}
              </div>
            }
          >
            <NavDropdown.Item as={NavLink} to="/profile/me" className="fw-bold text-primary">
              View profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Impostazioni</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Esci</NavDropdown.Item>
          </NavDropdown>

          <div className="vr d-none d-md-block mx-1 text-black-50"></div>

          <NavLink as="div" className="nav-link d-flex flex-column align-items-center px-2 px-md-3 text-hover text-secondary">
            <i className="bi bi-grid-3x3-gap-fill fs-5"></i>
            <span className="d-none d-md-block  spanUnderIcon">Business</span>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNav;
