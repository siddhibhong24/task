const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

  
    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

   
    const newUser = await User.create({
      name,
      email,
      password,  
      address,
      role,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('registration error:', err.message);
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(" Email not found:", email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log("Password in DB:", user.password);
    console.log("Password entered:", password);

  
    if (user.password !== password) {
      console.log("Passwords DO NOT match");
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log("Passwords match!");


    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );


    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

