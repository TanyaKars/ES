import React, { useState, useEffect } from 'react';
import { User } from '@es/shared';
import { userApi } from '../services/api';

interface UserListProps {
  onUserSelect: (user: User) => void;
  onUserCreate: () => void;
  refreshTrigger: number;
}

const UserList: React.FC<UserListProps> = ({ onUserSelect, onUserCreate, refreshTrigger }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, [refreshTrigger]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await userApi.getAll();
      setUsers(fetchedUsers);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    try {
      await userApi.delete(id);
      await loadUsers(); // Refresh the list
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error deleting user:', err);
    }
  };

  if (loading) {
    return (
      <div className="user-list">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list">
        <div className="error">
          {error}
          <button onClick={loadUsers} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>Users ({users.length})</h2>
        <button onClick={onUserCreate} className="create-btn">
          + Add User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <p>No users found</p>
          <button onClick={onUserCreate} className="create-btn">
            Create your first user
          </button>
        </div>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <small>Created: {new Date(user.createdAt).toLocaleDateString()}</small>
              </div>
              <div className="user-actions">
                <button
                  onClick={() => onUserSelect(user)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id, user.name)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;