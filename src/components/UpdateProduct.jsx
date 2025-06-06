import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id_product: Int!
    $name: String!
    $brand: String!
    $description: String!
    $price: Float!
    $stock: Int!
  ) {
    updateProduct(
      id_product: $id_product
      name: $name
      brand: $brand
      description: $description
      price: $price
      stock: $stock
    ) {
      message
    }
  }
`;

function UpdateProduct() {
  const [form, setForm] = useState({
    id: '',
    name: '',
    brand: '',
    description: '',
    price: '',
    stock: ''
  });

  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const input = {
      id_product: parseInt(form.id),
      name: form.name,
      brand: form.brand,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock)
    };

    console.log('Variables finales a enviar:', JSON.stringify(input, null, 2));

    try {
      const { data } = await updateProduct({ variables: input });
      if (data?.updateProduct?.message) {
        alert(data.updateProduct.message);
        setForm({ id: '', name: '', brand: '', description: '', price: '', stock: '' });
      }
    } catch (err) {
      console.error('Error al actualizar producto:', err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Actualizar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID del Producto"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Marca"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <button type="submit" disabled={loading}>Actualizar</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}

export default UpdateProduct;
