import {Link, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Nav, NavDropdown} from "react-bootstrap";
import UserContext from "../../stores/user-context-provider";
import SearchBar from "../../components/partial/SearchBar";

const Header = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();


    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Cooking Recipes</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <SearchBar/>
                    </Nav>
                    <Nav>
                        {!user ? (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav className="me-auto">
                                    <Button as={Link} to="/recipes/add">Create Recipe</Button>
                                </Nav>
                                <NavDropdown title={user.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#">My Recipes</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Account Settings</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="api/logout">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle/>
            </Container>
        </Navbar>
    )
}

export default Header;