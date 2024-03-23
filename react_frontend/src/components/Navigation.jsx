import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div>
            <Navbar style={{ backgroundColor: '#fff' }} expand="lg">
                <Navbar.Brand href="/">A Paint Company</Navbar.Brand>     
                <Nav>
                    {isAuthenticated ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                            <Nav.Link href="/login">Login</Nav.Link>}
                </Nav>
            </Navbar>
        </div>
    )
}
