const path = require('path');
const express = require('express');
const app = express();

app.use((req, res, next) => console.log(req.method, req.url) || next());
app.use(express.static(__dirname));
app.get('/*', (req, res, next) => res.send(path.join(__dirname, './index.html')));
app.listen(3000, () => console.log('listening on 3000'));