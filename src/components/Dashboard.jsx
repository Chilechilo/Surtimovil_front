import React from 'react';

export default function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <h1>Bienvenido, {user.name} ({user.role})</h1>
      <p>Inicio.</p>
      {user.role === 'admin' && <button className="admin-btn">Borrar Usuario (admin only)</button>}
    </div>
  );
}
