const Job = require("../models/Job");

// aici vom implementa functionalitatile legate de joburi: creare, actualizare, stergere, listare, etc.

// functia pentru a crea un job nou
exports.createJob = async (req, res) => {
    try {
        const jobData = req.body;
        jobData.company = req.user.id;
        const newJob = new Job(jobData);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la crearea jobului' });
        console.log(error);
    }
};

// functia pentru a obtine toate joburile
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('company', '-passwordHash');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la obtinerea joburilor' });
        console.log(error);
    }
};

exports.getJobs = async (req, res) => {
    try {
        const employerId = req.user.id;
        const jobs = await Job.find({ company: employerId }).populate('company', '-passwordHash');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la obtinerea joburilor angajatorului' });
        console.log(error);
    }
};

// functia pentru a obtine toate joburile pentru un angajator specific
exports.getJobsByEmployer = async (req, res) => {
    try {
        const employerId = req.params.employerId;
        const jobs = await Job.find({ company: employerId }).populate('company', '-passwordHash');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la obtinerea joburilor pentru angajator' });
        console.log(error);
    }
};

// functia pentru a obtine toate joburile dupa tag-uri specifice
exports.getJobsByTags = async (req, res) => {
    try {
        const tags = req.query.tags.split(','); // presupunem ca tag-urile sunt trimise ca un string separat prin virgule
        const jobs = await Job.find({ tags: { $in: tags } }).populate('company', '-passwordHash');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la obtinerea joburilor dupa tag-uri' });
        console.log(error);
    }
};

// functia pentru a obtine un job dupa id
exports.getJobById = async (req, res) => {
    console.log("Getting job by ID: ", req.params.id);
    try {
        const job = await Job.findById(req.params.id).populate('company', '-passwordHash');
        console.log(job);
        if (!job) {
            return res.status(404).json({ message: 'Jobul nu a fost gasit' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la obtinerea jobului' });
        console.log(error);
    }
};

// functia pentru a actualiza un job
exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: 'Jobul nu a fost gasit' });
        }
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la actualizarea jobului' });
        console.log(error);
    }
};

// functia pentru a sterge un job
exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Jobul nu a fost gasit' });
        }
        res.status(200).json({ message: 'Jobul a fost sters cu succes' });
    } catch (error) {
        res.status(500).json({ message: 'Eroare la stergerea jobului' });
        console.log(error);
    }
};

// Functia pentru a obtine candidatii care au aplicat la un job specific
exports.getJobApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // 1. Cautam jobul dupa ID
        // 2. Folosim .populate('applications') pentru a transforma ID-urile in date reale despre candidati
        // 3. Excludem campul 'passwordHash' pentru securitate
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            select: '-passwordHash' 
        });

        if (!job) {
            return res.status(404).json({ message: 'Jobul nu a fost gasit' });
        }

        // 4. VERIFICARE DE SECURITATE:
        // Ne asiguram ca cel care cere datele este chiar angajatorul care a creat jobul.
        // req.user.id vine din middleware-ul de autentificare.
        if (job.company.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Nu aveti dreptul sa vedeti aplicantii pentru acest job.' });
        }

        // Returnam doar lista de aplicanti, nu tot jobul
        res.status(200).json(job.applications);

    } catch (error) {
        console.error("Eroare la preluarea aplicanților:", error);
        res.status(500).json({ message: 'Eroare la obtinerea aplicantilor' });
    }
};