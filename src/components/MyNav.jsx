import { Container, Nav, Navbar, Form, InputGroup, NavDropdown } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const user = leggiUtenteRegistrato();

  const handleLogout = () => {
    localStorage.setItem(CHIAVE_UTENTE_LOGGATO, "false");
    navigate("/welcome", { replace: true });
  };

  return (
    <Navbar className="sticky-top bg-white border-bottom py-0" id="nav">
      <Container fluid className="px-md-5 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center flex-grow-1 flex-md-grow-0">
          <Navbar.Brand as={Link} to="/" className="p-0 me-2">
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
          <Nav.Link
            as={Link}
            to="/"
            className="d-flex flex-column align-items-center px-2 px-md-3 text-dark text-hover border-bottom border-dark border-2 border-md-0"
          >
            <i className="bi bi-house-door-fill fs-5"></i>
            <span className="d-none d-md-block spanUnderIcon">Home</span>
          </Nav.Link>

          <Nav.Link href="#" className="d-flex flex-column align-items-center px-2 px-md-3 text-secondary text-hover">
            <i className="bi bi-people-fill fs-5"></i>
            <span className="d-none d-md-block spanUnderIcon">My Network</span>
          </Nav.Link>

          <Nav.Link as={Link} to="/jobs" className="d-flex flex-column align-items-center px-2 px-md-3 text-secondary text-hover">
            <i className="bi bi-briefcase-fill fs-5"></i>
            <span className="d-none d-md-block spanUnderIcon">Jobs</span>
          </Nav.Link>

          <Nav.Link href="#" className="d-flex flex-column align-items-center px-2 px-md-3 text-secondary text-hover">
            <i className="bi bi-chat-dots-fill fs-5"></i>
            <span className="d-none d-md-block spanUnderIcon">Messaging</span>
          </Nav.Link>

          <Nav.Link href="#" className="d-flex flex-column align-items-center px-2 px-md-3 text-secondary text-hover">
            <i className="bi bi-bell-fill fs-5"></i>
            <span className="d-none d-md-block spanUnderIcon">Notifications</span>
          </Nav.Link>

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
            <NavDropdown.Item as={Link} to="/profile/me" className="fw-bold text-primary">
              View profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Impostazioni</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Esci</NavDropdown.Item>
          </NavDropdown>

          <div className="vr d-none d-md-block mx-1 text-black-50"></div>

          <Nav.Link href="#" className="d-none d-md-flex flex-column align-items-center px-3 text-secondary">
            <i className="bi bi-grid-3x3-gap-fill fs-5"></i>
            <span className="d-none d-md-block spanUnderIcon">Business</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNav;
