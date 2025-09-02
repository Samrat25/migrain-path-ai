const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory stores
let users = []; // { id, name, role, approved (for doctors) }
let assessments = {}; // userId -> assessment object
let mriFiles = {}; // userId -> filename string
let symptoms = {}; // userId -> symptoms string
let reports = []; // { id, userId, assessment, mriFilename, symptoms, diagnosis, goals }
let camps = []; // { id, name, location, date }

let nextIds = { user: 1, report: 1, camp: 1 };

// Helpers
function findUser(id) {
	return users.find(u => u.id === Number(id));
}

// Auth (mock)
app.post('/login', (req, res) => {
	const { name, role } = req.body || {};
	if (!name || !role) {
		return res.status(400).json({ error: 'name and role are required' });
	}
	let user = users.find(u => u.name === name && u.role === role);
	if (!user) {
		user = { id: nextIds.user++, name, role, approved: role === 'Doctor' ? false : true };
		users.push(user);
	}
	return res.json(user);
});

// Patient APIs
app.post('/patient/assessment', (req, res) => {
	const { userId, assessment } = req.body || {};
	if (!userId || !assessment) return res.status(400).json({ error: 'userId and assessment required' });
	if (!findUser(userId)) return res.status(404).json({ error: 'user not found' });
	assessments[userId] = assessment;
	return res.json({ ok: true });
});

app.post('/patient/mri', upload.single('file'), (req, res) => {
	const { userId } = req.body || {};
	if (!userId) return res.status(400).json({ error: 'userId required' });
	if (!findUser(userId)) return res.status(404).json({ error: 'user not found' });
	const filename = req.file ? req.file.originalname : req.body.filename;
	if (!filename) return res.status(400).json({ error: 'file required (multipart or filename)' });
	mriFiles[userId] = filename;
	return res.json({ ok: true, filename });
});

app.post('/patient/symptoms', (req, res) => {
	const { userId, text } = req.body || {};
	if (!userId) return res.status(400).json({ error: 'userId required' });
	if (!findUser(userId)) return res.status(404).json({ error: 'user not found' });
	symptoms[userId] = text || '';
	return res.json({ ok: true });
});

app.post('/patient/generate-report', (req, res) => {
	const { userId } = req.body || {};
	if (!userId) return res.status(400).json({ error: 'userId required' });
	const user = findUser(userId);
	if (!user) return res.status(404).json({ error: 'user not found' });
	const report = {
		id: nextIds.report++,
		userId: Number(userId),
		assessment: assessments[userId] || null,
		mriFilename: mriFiles[userId] || null,
		symptoms: symptoms[userId] || '',
		diagnosis: '',
		goals: '',
	};
	reports = reports.filter(r => r.userId !== Number(userId));
	reports.push(report);
	return res.json(report);
});

app.get('/patient/report/:userId', (req, res) => {
	const { userId } = req.params;
	const report = reports.find(r => r.userId === Number(userId));
	return res.json(report || null);
});

app.get('/patient/camps', (_req, res) => {
	return res.json(camps);
});

// Doctor APIs
app.get('/doctor/reports', (_req, res) => {
	return res.json(reports.map(r => ({
		...r,
		patient: findUser(r.userId) || null,
	})));
});

app.get('/doctor/report/:reportId', (req, res) => {
	const { reportId } = req.params;
	const report = reports.find(r => r.id === Number(reportId));
	if (!report) return res.status(404).json({ error: 'report not found' });
	return res.json({
		...report,
		patient: findUser(report.userId) || null,
	});
});

app.post('/doctor/report/:reportId/feedback', (req, res) => {
	const { reportId } = req.params;
	const { diagnosis, goals } = req.body || {};
	const report = reports.find(r => r.id === Number(reportId));
	if (!report) return res.status(404).json({ error: 'report not found' });
	report.diagnosis = diagnosis || '';
	report.goals = goals || '';
	return res.json(report);
});

// Admin APIs
app.post('/admin/camps', (req, res) => {
	const { name, location, date } = req.body || {};
	if (!name || !location || !date) return res.status(400).json({ error: 'name, location, date required' });
	const camp = { id: nextIds.camp++, name, location, date };
	camps.push(camp);
	return res.json(camp);
});

app.get('/admin/camps', (_req, res) => {
	return res.json(camps);
});

app.get('/admin/users', (_req, res) => {
	return res.json(users);
});

app.post('/admin/doctor/:doctorId/toggle-approval', (req, res) => {
	const { doctorId } = req.params;
	const user = findUser(doctorId);
	if (!user || user.role !== 'Doctor') return res.status(404).json({ error: 'doctor not found' });
	user.approved = !user.approved;
	return res.json(user);
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});



