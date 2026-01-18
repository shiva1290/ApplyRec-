const authService = require('../services/authService');

async function signup(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await authService.signup(email, password);
    res.status(201).json({
      message: 'User created successfully',
      user: { id: result.userId, email: result.email },
      token: result.token
    });
  } catch (error) {
    if (error.message === 'Email already registered') {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await authService.login(email, password);
    res.json({
      message: 'Login successful',
      user: { id: result.userId, email: result.email },
      token: result.token
    });
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { signup, login };
