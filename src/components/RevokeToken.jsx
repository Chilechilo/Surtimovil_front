import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import '../App.css';

const REVOKE_TOKEN = gql`
  mutation revokeToken($email: String!) {
    revokeToken(email: $email) {
      message
    }
  }
`;

function RevokeToken() {
  const [email, setEmail] = useState('');
  const [revokeToken, { loading, error, data }] = useMutation(REVOKE_TOKEN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await revokeToken({ variables: { email } });
    alert('Token revocado');
    setEmail('');
  };

  return (
    <div className="formulario">
      <h2>Revocar Token</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo del usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={loading}>Revocar</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>{data.revokeToken.message}</p>}
    </div>
  );
}

export default RevokeToken;
