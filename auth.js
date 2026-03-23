/* ═══════════════════════════════════════════════════════
   MC Global México — Auth System (localStorage)
   ═══════════════════════════════════════════════════════ */

const USERS = [
  { username: 'admin', password: '1234', role: 'admin', name: 'Administrador MC Global' },
  { username: 'cliente', password: '1234', role: 'cliente', name: 'Cliente MC Global' },
];

const AUTH_KEY = 'mcglobal_session';

function login(username, password) {
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const session = { username: user.username, role: user.role, name: user.name, loginTime: Date.now() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return session;
  }
  return null;
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'login.html';
}

function getSession() {
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) return null;
  try { return JSON.parse(data); } catch { return null; }
}

function requireAuth(allowedRoles) {
  const session = getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  if (allowedRoles && !allowedRoles.includes(session.role)) {
    window.location.href = 'login.html';
    return null;
  }
  return session;
}
