import React from 'react';

import './App.css';

import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import CreateProducts from './components/CreateProducts';
import ReadProducts from './components/ReadProducts';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function App() {
    return (
        <BrowserRouter>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">A Tiro de As</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/products/read">Listado de productos</Nav.Link>
                            <NavDropdown title="Catálogo">
                                <NavDropdown.Item href="/products/read/by-category">Productos por categoría</NavDropdown.Item>
                                <NavDropdown.Item href="/products/read/by-name">Productos por nombre</NavDropdown.Item>
                                <NavDropdown.Item href="/products/read/by-price">Productos por precio menor</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className='p-3'>
                <Routes>
                    <Route exact path='/' element={<>
                        <h1 className='mb-3'>Inicio</h1>
                    </>} />
                    <Route exact path='/products/create' element={<>
                        <h1 className='mb-3'>Agregar Productos</h1>
                        <CreateProducts />
                    </>} />
                    <Route exact path='/products/read' element={<>
                        <h1 className='mb-3'>Listado de Productos</h1>
                        <Button className='mb-3' href="/products/create">Agregar Productos</Button>
                        <ReadProducts editable />
                    </>} />
                    <Route path='/products/read/:filter' element={<>
                        <h1 className='mb-3'>Catálogo de Productos</h1>
                        <ReadProducts />
                    </>} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
