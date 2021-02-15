const app = require("./server.js");
const port = 3001

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
