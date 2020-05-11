module.exports = [
  {
    path: '/',
    component: './Layouts',
    routes: [
      {
        name: 'main',
        path: '/',
        redirect: '/forward',
      },
      {
        name: 'forward',
        path: '/forward',
        component: './Forward',
      },
      {
        name: 'intercept',
        path: '/intercept',
        component: './Intercept',
      },
    ],
  },
];
