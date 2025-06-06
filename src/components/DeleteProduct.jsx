import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import '../App.css';

const DELETE_PRODUCT = gql`
  mutation deleteProduct($Id_product: Int!) {
    deleteProduct(Id_product: $Id_product) {
      message
    }
  }
`;

function DeleteProduct() {
  const [Id_product, setIdProduct] = useState('');
  const [deleteProduct, { loading, error, data }] = useMutation(DELETE_PRODUCT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await deleteProduct({
      variables: {
        Id_product: parseInt(Id_product),
      },
    });
    alert('Producto eliminado');
    setIdProduct('');
  };

  return (
    <div className="formulario">
      <h2>Eliminar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID del Producto"
          value={Id_product}
          onChange={(e) => setIdProduct(e.target.value)}
        />
        <button type="submit" disabled={loading}>Eliminar</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>{data.deleteProduct.message}</p>}
    </div>
  );
}

export default DeleteProduct;
