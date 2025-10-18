// server.js - Use this file to start the server
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('\n📋 Available endpoints:');
  console.log(`   🏠 Home: http://localhost:${PORT}/`);
  console.log(`   📱 Demo UI: http://localhost:${PORT}/index.html`);
  console.log(`   🔐 Login: http://localhost:${PORT}/login`);
  console.log(`   📘 Facebook Auth: http://localhost:${PORT}/auth/facebook`);
  console.log(`   📊 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`   👤 Profile: http://localhost:${PORT}/profile`);
  console.log(`   🚪 Logout: http://localhost:${PORT}/auth/logout`);
  console.log(`   📡 Auth Status: http://localhost:${PORT}/auth/status`);
  console.log(`   🔧 API User: http://localhost:${PORT}/api/user`);
  console.log('\n💡 To test: Visit the Demo UI or start with Facebook Auth');
  console.log('⚠️  Make sure to configure your Facebook App credentials in .env');
});
