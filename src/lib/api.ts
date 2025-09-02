export type UserSession = {
	id: number;
	name: string;
	role: 'Patient' | 'Doctor' | 'Admin';
	approved?: boolean;
};

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function getSession(): UserSession | null {
	const raw = localStorage.getItem('session');
	return raw ? (JSON.parse(raw) as UserSession) : null;
}

export function setSession(session: UserSession) {
	localStorage.setItem('session', JSON.stringify(session));
}

export function clearSession() {
	localStorage.removeItem('session');
}

async function request(path: string, options: RequestInit = {}) {
	const res = await fetch(`${BASE_URL}${path}`, {
		...options,
		headers: {
			'Content-Type': options.body instanceof FormData ? undefined : 'application/json',
			...(options.headers || {}),
		},
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || `Request failed: ${res.status}`);
	}
	return res.json();
}

export const api = {
	login: (name: string, role: 'Patient' | 'Doctor' | 'Admin') =>
		request('/login', { method: 'POST', body: JSON.stringify({ name, role }) }) as Promise<UserSession>,

	// Patient
	saveAssessment: (userId: number, assessment: Record<string, unknown>) =>
		request('/patient/assessment', { method: 'POST', body: JSON.stringify({ userId, assessment }) }),
	saveMri: (userId: number, fileOrName: File | string) => {
		if (typeof fileOrName === 'string') {
			const form = new FormData();
			form.append('userId', String(userId));
			form.append('filename', fileOrName);
			return request('/patient/mri', { method: 'POST', body: form });
		}
		const form = new FormData();
		form.append('userId', String(userId));
		form.append('file', fileOrName);
		return request('/patient/mri', { method: 'POST', body: form });
	},
	saveSymptoms: (userId: number, text: string) =>
		request('/patient/symptoms', { method: 'POST', body: JSON.stringify({ userId, text }) }),
	generateReport: (userId: number) =>
		request('/patient/generate-report', { method: 'POST', body: JSON.stringify({ userId }) }),
	getPatientReport: (userId: number) => request(`/patient/report/${userId}`),
	getCamps: () => request('/patient/camps'),

	// Doctor
	getReports: () => request('/doctor/reports'),
	getReport: (reportId: number) => request(`/doctor/report/${reportId}`),
	saveFeedback: (reportId: number, diagnosis: string, goals: string) =>
		request(`/doctor/report/${reportId}/feedback`, { method: 'POST', body: JSON.stringify({ diagnosis, goals }) }),

	// Admin
	createCamp: (name: string, location: string, date: string) =>
		request('/admin/camps', { method: 'POST', body: JSON.stringify({ name, location, date }) }),
	listCamps: () => request('/admin/camps'),
	listUsers: () => request('/admin/users'),
	toggleDoctorApproval: (doctorId: number) => request(`/admin/doctor/${doctorId}/toggle-approval`, { method: 'POST' }),
};



