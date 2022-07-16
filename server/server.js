//NOTE: setting vaq env begin run server
require('dotenv').config({ path: './src/config/variable.env' });

const app = require('./src/app.js');
const db = require('./src/config/database.js');

//NOTE: connect to database
db.connect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
