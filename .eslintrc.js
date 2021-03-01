module.exports = {
  root: true,
  plugins: ['xyz'],
  extends: ['plugin:xyz/vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
