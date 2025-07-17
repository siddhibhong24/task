const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});


sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('DB connection failed:', err));

sequelize.sync({ force: false })
  .then(() => console.log('Models synced'))
  .catch((err) => console.log('Sync failed:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
