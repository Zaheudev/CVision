const Employer = require('../models/Candidate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Înregistrează un candidat nou
exports.registerCandidate = async (req, res) => {
    // const { username, email, password } = req.body;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log({name, email, password});
    try {
        // Verifică dacă emailul este deja folosit
        const existingCandidate = await Employer.findOne({ email });
        if (existingCandidate) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Generează hash pentru parolă
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creează un utilizator nou pe care îl salvează în baza de date
        const newCandidate = new Employer({ name, email, passwordHash: hashedPassword });
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
    console.log({name, email, password});
    try {
        // Verifică dacă emailul este deja folosit
        const existingEmployer = await Employer.findOne({ email });
        if (existingEmployer) {
            return res.status(400).json({ message: 'Email already in use' });
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

// logheaza un angajator existent
exports.loginEmployer = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Găsește utilizatorul după email
        const employer = await Employer.findOne({ email });
        if (!employer) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compară parola
        const isMatch = await bcrypt.compare(password, employer.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generează un token JWT
        const token = jwt.sign({ id: employer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(employer._id);
        res.status(200).json({
            user: { token: token, id: employer._id },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};

// Autentifică un candidat existent
exports.loginCandidate = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Găsește utilizatorul după email
        const candidate = await Employer.findOne({ email });
        if (!candidate) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compară parola
        const isMatch = await bcrypt.compare(password, candidate.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generează un token JWT
        const token = jwt.sign({ id: candidate._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(candidate._id);
        res.status(200).json({
            user: { token: token, id: candidate._id },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};