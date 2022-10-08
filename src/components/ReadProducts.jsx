import React from 'react';

import { useParams } from 'react-router-dom';

import { Button, Modal, Stack } from 'react-bootstrap';

import FilterProductsByCategory from './FilterProductByCategory';
import FilterProductsByName from './FilterProductByName';
import FilterProductsByPrice from './FilterProductByPrice';
import ProductTable from './ProductTable';

import Product from '../api/Product';

export default function ReadProducts(properties) {
    const { editable } = properties;
    const { filter } = useParams();
    const [allProducts, setAllProducts] = React.useState([]);
    const [products, setProducts] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        Product.readAll()
            .then(response =>
                response.json()
                    .then(data => {
                        if (response.ok) setAllProducts(data);
                        else setError(data.message);
                    })
                    .catch(error => setError(error.message))
            )
            .catch(error => setError(error.message));
    }, []);
    return (
        <>
            <Stack gap={3}>
                {filter && {
                    'by-category': <FilterProductsByCategory onFilter={setProducts} />,
                    'by-name': <FilterProductsByName onFilter={setProducts} />,
                    'by-price': <FilterProductsByPrice onFilter={setProducts} />,
                }[filter]}
                <ProductTable
                    data={products || (filter ? allProducts.filter(product => product.available) : allProducts)}
                    editable={editable}
                    onUpdate={product => setAllProducts(allProducts.map(item => item.id === product.id ? product : item))}
                    onDelete={product => setAllProducts(allProducts.filter(item => item.id !== product.id))}
                />
            </Stack>
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