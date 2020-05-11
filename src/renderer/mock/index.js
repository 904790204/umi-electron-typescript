import forward from './forward.js';

export default {
  'GET /api/forward/getLeftBar': (req, res) => {
    res.header('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(forward.getLeftBar));
  },
};
