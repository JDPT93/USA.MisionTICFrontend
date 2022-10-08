import React from 'react';

import Table from 'react-bootstrap/Table';

import ProductItem from './ProductItem';

export default function ProductTable(properties) {
    const { data, editable, onDelete, onUpdate } = properties;
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Código</th>
                    <th>Categoría</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Disponible</th>
                    {editable && <th>Acciones</th>}
                </tr>
            </thead>
            <tbody>
                {data === undefined || data.length === 0
                    ? <tr><td colSpan={editable ? 9 : 8}>No hay productos para mostrar</td></tr>
                    : data.map(product => <ProductItem data={product} editable={editable} key={product.id} onDelete={onDelete} onUpdate={onUpdate} />)}
            </tbody>
        </Table>
    );
}