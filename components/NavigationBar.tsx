import Link from 'next/link';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function NavigationBar() {
    return (
        <Navbar bg="light" expand="sm">
            <Container>
                <Link href="/">
                    <Navbar.Brand>
                        Kauppalista
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/">
                            Etusivu
                        </Nav.Link>
                        <Nav.Link as={Link} href="/listat">
                            Listat
                        </Nav.Link>
                        <Nav.Link as={Link} href="/listat/uusi">
                            Uusi
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
