import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface DataListProps {
  users: User[];
  loading: boolean;
  error: string | null;
}

const DataList: React.FC<DataListProps> = ({ users, loading, error }) => {

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (error) {
    return <div className="error-text">Error: {error}</div>;
  }

  return (
    <section className="data-section">
      <h2 className="section-title">Users</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-card">
            <div className="user-name">{user.name}</div>
            <div className="user-details">
              <div className="user-username">@{user.username}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DataList;