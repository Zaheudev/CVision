const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Înregistrează un utilizator nou
exports.registerUser = async (req, res) => {
    // const { username, email, password } = req.body;
    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log({name, email, password});
    try {
        console.log('test');
        // Verifică dacă emailul este deja folosit
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Generează hash pentru parolă
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creează un utilizator nou pe care îl salvează în baza de date
        const newUser = new User({ name, email, passwordHash: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};

// Autentifică un utilizator
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Găsește utilizatorul după email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compară parola
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generează un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(user._1d);
        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};