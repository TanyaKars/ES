import React, { useState } from 'react';
import { User, CreateUserDto, UpdateUserDto } from '@es/shared';
import { userApi } from '../services/api';

interface UserFormProps {
  user?: User;
  onSubmit: () => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (user) {
        // Update existing user
        const updateData: UpdateUserDto = {};
        if (formData.name !== user.name) updateData.name = formData.name;
        if (formData.email !== user.email) updateData.email = formData.email;
        
        if (Object.keys(updateData).length > 0) {
          await userApi.update(user.id, updateData);
        }
      } else {
        // Create new user
        const createData: CreateUserDto = {
          name: formData.name,
          email: formData.email,
        };
        await userApi.create(createData);
      }

      onSubmit();
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="user-form-overlay">
      <div className="user-form">
        <h2>{user ? 'Edit User' : 'Create User'}</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : (user ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;