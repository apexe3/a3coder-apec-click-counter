import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

let clickCount = 0;

app.get('/api/count', (req: Request, res: Response) => {
  res.json({ count: clickCount });
});

app.post('/api/count', (req: Request, res: Response) => {
  clickCount++;
  res.json({ count: clickCount });
});

app.post('/api/count/decrement', (req: Request, res: Response) => {
  if (clickCount > 0) {
    clickCount--;
  }
  res.json({ count: clickCount });
});

app.post('/api/count/reset', (req: Request, res: Response) => {
  clickCount = 0;
  res.json({ count: clickCount });
});

app.get('/', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: 'public' });
});

app.use((req: Request, res: Response) => {
  console.log('404 for:', req.url);
  res.status(404).json({ error: 'Not found', url: req.url });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
