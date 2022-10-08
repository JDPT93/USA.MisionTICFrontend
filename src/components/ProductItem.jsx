import React from 'react';

import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';

import Product from '../api/Product';

export default function ProductItem(properties) {
    const { data, editable, onDelete, onUpdate } = properties;
    const [editMode, setEditMode] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [confirm, setConfirm] = React.useState(false);
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
            .catch(error => setError(error.message));
    }, []);
    return (
        <tr>
            <td>{editMode
                ? <Form.Control defaultValue={data.image} form={'product-update-' + data.id} name='image' placeholder='Imagen' required type='url' />
                : <img alt={data.name} src={data.image} width={100} />
            }</td>
            <td>{data.id}</td>
            <td>{editMode
                ? <>
                    <Form.Control defaultValue={data.category} form={'product-update-' + data.id} list='category-list' name='category' placeholder='Categoría' required type='text' />
                    <datalist id='category-list'>
                        {categories.map(category => <option key={category}>{category}</option>)}
                    </datalist>
                </>
                : data.category
            }</td>
            <td>{editMode
                ? <Form.Control defaultValue={data.name} form={'product-update-' + data.id} name='name' placeholder='Nombre' required type='text' />
                : data.name
            }</td>
            <td>{editMode
                ? <Form.Control as='textarea' defaultValue={data.description} form={'product-update-' + data.id} name='description' placeholder='Descripción' required />
                : data.description
            }</td>
            <td>{editMode
                ? <Form.Control defaultValue={data.price} form={'product-update-' + data.id} name='price' min='0' placeholder='Precio' required type='number' />
                : data.price
            }</td>
            <td>{editMode
                ? <Form.Control defaultValue={data.stock} form={'product-update-' + data.id} name='stock' min='0' placeholder='Cantidad' required type='number' />
                : data.stock
            }</td>
            <td>{editMode
                ? <Form.Check defaultChecked={data.available} form={'product-update-' + data.id} name='available' type='checkbox' label='Disponible' />
                : data.available ? 'Sí' : 'No'
            }</td>
            {editable && <td>
                <Form id={'product-update-' + data.id} onSubmit={event => {
                    event.preventDefault();
                    if (!editMode) setEditMode(true);
                    else {
                        const form = event.target;
                        const product = {
                            id: data.id,
                            category: form.category.value,
                            name: form.name.value,
                            description: form.description.value,
                            price: form.price.value,
                            stock: form.stock.value,
                            image: form.image.value,
                            available: form.available.checked,
                        };
                        Product.update(product)
                            .then(response =>
                                response.json()
                                    .then(data => {
                                        if (response.ok) {
                                            setEditMode(false);
                                            onUpdate(product.name);
                                        } else setError(data.message);
                                    })
                                    .catch(error => setError(error.message))
                            )
                            .catch(error => setError(error.message));
                    }
                }}>
                    <ButtonGroup aria-label="Acciones">
                        <Button size='sm' style={{ width: '70px' }} type='submit' variant={editMode ? 'success' : 'primary'}>{editMode ? 'Guardar' : 'Editar'}</Button>
                        <Button size='sm' style={{ width: '70px' }} type='button' variant="danger" onClick={() => setConfirm(true)}>{editMode ? 'Cancelar' : 'Eliminar'}</Button>
                    </ButtonGroup>
                    <Modal animation={false} show={confirm} onHide={() => setConfirm(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>¿Desea elimiar este producto?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Eliminar el producto <b>"{data.name}"</b>.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setConfirm(false)}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={event => editMode
                                ? setEditMode(false)
                                : Product.deleteById(data.id)
                                    .then(response =>
                                        response.json()
                                            .then(data => {
                                                if (response.ok) onDelete(data);
                                                else setError(data.message);
                                            })
                                            .catch(error => setError(error.message))
                                    )
                                    .catch(error => setError(error.message))
                            }>
                                Aceptar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
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
            </td>}
        </tr >
    );
}