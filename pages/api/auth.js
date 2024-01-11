// api/auth.js
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default (req, res) => {
  if (req.method === 'POST') {
    // For simplicity, use dummy user data
    const { username, password } = req.body;

    // Check credentials (replace with your authentication logic)
    if (username === 'user' && password === 'password') {
      // Generate a JWT token
      const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });

      // Set the token as a cookie
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 3600, // 1 hour
        path: '/',
      }));

      res.status(200).json({ success: true, message: 'Authentication successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};
