module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '274b3e2baea01c49fb550f5a4eab595f'),
  },
});
