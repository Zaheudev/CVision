const Employer = require('../models/Employer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Candidate = require('../models/Candidate');

const { getUserByEmail, getUserById } = require('./getUser');

// Înregistrează un candidat nou
exports.registerCandidate = async (req, res) => {
    // const { username, email, password } = req.body;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log({name, email, password});
    try {
        // Verifică dacă emailul este deja folosit in tabela pentru candidati
        // dar trebuie sa verificam si in tabela angajatorilor pentru a evita conflicte
        const user = await getUserByEmail(email);
        if (user) {
            return res.status(400).json({ message: 'Email already in use by user type: ' + (user instanceof Candidate ? 'candidate' : 'employer')});
        }

        // Generează hash pentru parolă
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creează un utilizator nou pe care îl salvează în baza de date
        const newCandidate = new Candidate({ name, email, passwordHash: hashedPassword });
        await newCandidate.save();

        res.status(201).json({ message: 'Candidate registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};

// Înregistrează un angajator nou
exports.registerEmployer = async (req, res) => {
    // const { username, email, password } = req.body;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        // Verifică dacă emailul este deja folosit in tabela pentru angajatori
        // dar trebuie sa verificam si in tabela candidatilor pentru a evita conflicte
        const user = await getUserByEmail(email);

        if (user) {
            return res.status(400).json({ message: 'Email already in use by user type: ' + (user instanceof Candidate ? 'candidate' : 'employer')});
        }

        // Generează hash pentru parolă
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creează un utilizator nou pe care îl salvează în baza de date
        const newEmployer = new Employer({ name, email, passwordHash: hashedPassword });
        await newEmployer.save();

        res.status(201).json({ message: 'Employer registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};

// logheaza un user(candidat sau angajator) existent
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Găsește utilizatorul după email
        const user = await getUserByEmail(email);
        console.log(user);
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
        console.log(user._id);
        res.status(200).json({
            user: { token: token, id: user._id },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};