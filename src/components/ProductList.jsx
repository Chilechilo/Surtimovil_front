import { gql, useQuery } from '@apollo/client';

const GET_ALL_PRODUCTS = gql`
  query {
    getAllProducts {
      Id_product
      name
      brand
      description
      price
      stock
    }
  }
`;

function ProductList() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {data.getAllProducts.map((product) => (
          <li key={product.Id_product}>
            <strong>{product.name}</strong> — {product.brand} (${product.price})<br />
            {product.description} | Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
