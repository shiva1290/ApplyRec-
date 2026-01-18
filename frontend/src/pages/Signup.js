import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Signup.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { signup } from '../services/authService';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await signup(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.floatingDot}></div>
      <div className={styles.floatingDot}></div>
      <div className={styles.floatingDot}></div>
      <div className={styles.floatingDot}></div>
      <div className={styles.card}>
        <h1 className={styles.title}>Get Started</h1>
        <p className={styles.subtitle}>Create an account to track your applications</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <p className={styles.footer}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
