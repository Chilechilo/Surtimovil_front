import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const CREATE_ORDER_PRODUCT = gql`
  mutation createOrderProduct($Id_order: Int!, $Id_product: Int!, $quantity: Int!) {
    createOrderProduct(Id_order: $Id_order, Id_product: $Id_product, quantity: $quantity) {
      message
    }
  }
`;

function CreateOrderProduct() {
  const [form, setForm] = useState({
    Id_order: '',
    Id_product: '',
    quantity: '',
  });

  const [createOrderProduct, { loading, error }] = useMutation(CREATE_ORDER_PRODUCT);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Id_order = parseInt(form.Id_order, 10);
    const Id_product = parseInt(form.Id_product, 10);
    const quantity = parseInt(form.quantity, 10);

    if (isNaN(Id_order) || isNaN(Id_product) || isNaN(quantity)) {
      alert('Todos los campos deben tener valores válidos');
      return;
    }

    try {
      await createOrderProduct({
        variables: { Id_order, Id_product, quantity },
      });
      alert('Producto agregado a la orden');
      setForm({ Id_order: '', Id_product: '', quantity: '' });
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  return (
    <div className="formulario">
      <h2>Agregar Producto a Orden</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="ID de Orden" value={form.Id_order} onChange={(e) => setForm({ ...form, Id_order: e.target.value })} />
        <input type="number" placeholder="ID de Producto" value={form.Id_product} onChange={(e) => setForm({ ...form, Id_product: e.target.value })} />
        <input type="number" placeholder="Cantidad" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <button type="submit" disabled={loading}>Agregar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
}

export default CreateOrderProduct;
