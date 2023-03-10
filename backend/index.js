const express = require('express');
const cors = require('cors');


const app = express();
const port = 3001;

app.use(cors());

const routes = require('./routes/routes')
app.use("/",routes)
  
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
