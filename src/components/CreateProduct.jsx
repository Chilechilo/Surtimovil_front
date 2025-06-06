import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $brand: String!
    $description: String!
    $price: Float!
    $stock: Int!
  ) {
    createProduct(
      name: $name
      brand: $brand
      description: $description
      price: $price
      stock: $stock
    ) {
      Id_product
      name
    }
  }
`;

function CreateProduct() {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    stock: '',
  });

  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct({
      variables: {
        name: form.name,
        brand: form.brand,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      },
    });
    alert('Producto creado');
    setForm({
      name: '',
      brand: '',
      description: '',
      price: '',
      stock: '',
    });
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br />
        <input
          placeholder="Marca"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        /><br />
        <input
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        /><br />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        /><br />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        /><br />
        <button type="submit" disabled={loading}>Crear Producto</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>Producto creado: {data.createProduct.name}</p>}
    </div>
  );
}

export default CreateProduct;
