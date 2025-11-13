const app = require('./index')
require('dotenv').config()

const PORT = parseInt(`${process.env.PORT || 3000}`)

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
