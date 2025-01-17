const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;

  const pythonProcess = spawn('python', ['scripts/analysis.py']);

  pythonProcess.stdin.write(JSON.stringify(data));
  pythonProcess.stdin.end();

  let result = '';
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error('Python error:', data.toString());
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).send('Error running Python script');
    }
    res.json(JSON.parse(result));
  });
});

module.exports = router;