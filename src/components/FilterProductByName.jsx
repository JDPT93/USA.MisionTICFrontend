import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import Product from '../api/Product';

export default function FilterProductsByName(properties) {
    const { onFilter } = properties;
    const [error, setError] = React.useState(null);
    return (
        <>
            <FloatingLabel controlId='filter-by-name' label='Filtrar por nombre'>
                <Form.Control placeholder='Nombre' type='text' onChange={event => {
                    const { value } = event.target;
                    if (value.trim() === '') onFilter(null);
                    else Product.readAvailableByNameLike(value)
                        .then(response =>
                            response.json()
                                .then(data => onFilter(response.ok ? data : null))
                                .catch(error => {
                                    onFilter(null);
                                    setError(error);
                                })
                        )
                        .catch(error => {
                            onFilter(null);
                            setError(error);
                        })
                }} />
            </FloatingLabel>
            <Modal animation={false} show={error !== null} onHide={() => setError(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setError(null)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}