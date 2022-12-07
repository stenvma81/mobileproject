const baseUrl = 'http://localhost:8000/';

const testUrl = baseUrl + 'test/';
const uploadsUrl = baseUrl + 'uploads/';
const loginUrl = baseUrl + 'auth/login';
const postUrl = baseUrl + 'post/';
const messageUrl = baseUrl + 'message/';

const postStates = {
  open: { id: 0, title: 'Open' },
  prosessing: { id: 1, title: 'Processing' },
  closed: { id: 2, title: 'Closed' },
};

const postTypes = {
  feedback: { id: 1, title: 'Feedback' },
  serviceAdvice: { id: 2, title: 'Service advice' },
  safetyAdvice: { id: 3, title: 'Safety advice' },
};

const userRoles = {
  admin: { id: 1, title: 'admin' },
  user: { id: 2, title: 'user' },
};

export {
  baseUrl,
  uploadsUrl,
  loginUrl,
  postUrl,
  testUrl,
  messageUrl,
  postStates,
  postTypes,
  userRoles,
};
