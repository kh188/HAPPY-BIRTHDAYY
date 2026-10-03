// Tailwind CDN is used in HTML files.
// This config file is kept for optional local Tailwind CLI builds.
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        body: ['Nunito', 'sans-serif']
      },
      boxShadow: {
        card: '0 12px 40px -12px rgba(236, 72, 153, 0.35)',
        btn: '0 6px 18px -4px rgba(236, 72, 153, 0.5)'
      }
    }
  },
  plugins: []
};
