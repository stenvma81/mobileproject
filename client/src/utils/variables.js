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

export {
  baseUrl,
  uploadsUrl,
  loginUrl,
  postUrl,
  testUrl,
  messageUrl,
  postStates,
};
