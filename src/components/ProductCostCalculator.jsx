import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';

const CALCULATE_COST = gql`
  query calculateProductCost($product_name: String!, $amount: Int!) {
    calculateProductCost(product_name: $product_name, amount: $amount)
  }
`;

function ProductCostCalculator() {
  const [form, setForm] = useState({ product_name: '', amount: 1 });
  const [calculate, { data, loading, error }] = useLazyQuery(CALCULATE_COST);

  const handleSubmit = (e) => {
    e.preventDefault();
    calculate({
      variables: {
        product_name: form.product_name,
        amount: parseInt(form.amount),
      },
    });
  };

  return (
    <div>
      <h2>Calcular Costo de Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre del producto"
          value={form.product_name}
          onChange={(e) => setForm({ ...form, product_name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <button type="submit">Calcular</button>
      </form>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>Total: {data.calculateProductCost}</p>}
    </div>
  );
}

export default ProductCostCalculator;
