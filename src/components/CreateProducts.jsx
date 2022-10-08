import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import Product from '../api/Product';
import { Modal } from 'react-bootstrap';

export default function CreateProducts(properties) {
    const navigate = useNavigate();
    const [categories, setCategories] = React.useState([]);
    const [product, setProduct] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        Product.Category.readAll()
            .then(response =>
                response.json()
                    .then(data => {
                        if (response.ok) setCategories(data.sort((left, right) => left.localeCompare(right)));
                        else setError(data.message);
                    })
                    .catch(error => setError(error.message))
            )
            .catch(error => setError(error.message))
    }, []);
    return (
        <>
            <Form onSubmit={event => {
                event.preventDefault();
                const form = event.target;
                const product = {
                    category: form.category.value,
                    name: form.name.value,
                    description: form.description.value,
                    price: form.price.value,
                    stock: form.stock.value,
                    image: form.image.value,
                    available: form.available.Checked,
                };
                Product.create(product).then(response => {
                    response.json()
                        .then(data => {
                            if (response.ok) {
                                form.reset();
                                setProduct(product.name);
                            } else setError(data.message);
                        })
                        .catch(error => setError(error.message))
                }).catch(error => setError(error.message));
            }}>
                <FloatingLabel className='mb-3' controlId='product-category' label='Categoría'>
                    <Form.Control required name='category' placeholder='Categoría' type='text' list='category-list' />
                    <datalist id='category-list'>
                        {categories.map(category => <option key={category}>{category}</option>)}
                    </datalist>
                </FloatingLabel>
                <FloatingLabel className='mb-3' controlId='product-name' label='Nombre'>
                    <Form.Control required name='name' placeholder='Nombre' type='text' />
                </FloatingLabel>
                <FloatingLabel className='mb-3' controlId='product-description' label='Descripción'>
                    <Form.Control required name='description' placeholder='Descripción' as='textarea' />
                </FloatingLabel>
                <FloatingLabel className='mb-3' controlId='product-price' label='Precio'>
                    <Form.Control required name='price' min='0' placeholder='Precio' type='number' />
                </FloatingLabel>
                <FloatingLabel className='mb-3' controlId='product-stock' label='Cantidad'>
                    <Form.Control required name='stock' min='0' placeholder='Cantidad' type='number' />
                </FloatingLabel>
                <FloatingLabel className='mb-3' controlId='product-image' label='Imagen'>
                    <Form.Control required name='image' placeholder='Imagen' type='url' />
                </FloatingLabel>
                <Form.Group className='mb-3' controlId='product-available'>
                    <Form.Check name='available' type='checkbox' label='Disponible' />
                </Form.Group>
                <Button variant='primary' type='submit'>Guardad Product</Button>
            </Form>
            <Modal animation={false} show={product !== null} onHide={() => setProduct(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Producto Creado</Modal.Title>
                </Modal.Header>
                <Modal.Body>El producto <b>"{product}"</b> ha sido creado con éxito.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate('/products/read')}>
                        Volver a la Lista de Productos
                    </Button>
                    <Button variant="primary" onClick={() => setProduct(null)}>
                        Agregar otro Producto
                    </Button>
                </Modal.Footer>
            </Modal>
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