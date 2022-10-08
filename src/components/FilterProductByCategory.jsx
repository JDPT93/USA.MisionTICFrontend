import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import Form from 'react-bootstrap/Form';

import Product from '../api/Product';

export default function FilterProductsByCategory(properties) {
    const { onFilter } = properties;
    const [categories, setCategories] = React.useState([]);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        Product.Category.readAll()
            .then(response => {
                response.json()
                    .then(data => {
                        if (response.ok) setCategories(data.sort((left, right) => left.localeCompare(right)));
                        else setError(data.message);
                    })
                    .catch(error => setError(error.message));
            })
            .catch(error => setError(error.message));
    }, []);
    return (
        <>
            <Form.Select aria-label='Categoría' onChange={event => {
                const { value } = event.target;
                if (value.trim() === '') onFilter(null);
                else Product.readAvailableByCategory(value)
                    .then(response =>
                        response.json()
                            .then(data => onFilter(response.ok ? data : null))
                            .catch(error => onFilter(null))
                    )
                    .catch(error => onFilter(null))
            }}>
                <option value=''>Filtrar por Categoría</option>
                {categories.map(category => <option key={category}>{category}</option>)}
            </Form.Select>
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