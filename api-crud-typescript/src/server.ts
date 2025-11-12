import dotenv from 'dotenv';
dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

import app from './index';

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
