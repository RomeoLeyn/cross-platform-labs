const { validateEmail, validatePassword } = require('./LoginScreen');

test('valid email passes validation', () => {
  expect(validateEmail('test@example.com')).toBe(true);
});

test('short password fails validation', () => {
  expect(validatePassword('123')).toBe(false);
});