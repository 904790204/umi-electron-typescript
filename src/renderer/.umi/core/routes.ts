import { ApplyPluginsType } from '/Users/zhaojin/Desktop/work/umi-electron-typescript/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    path: '/',
    component: require('/Users/zhaojin/Desktop/work/umi-electron-typescript/src/renderer/pages/Layouts')
      .default,
    routes: [
      {
        name: 'main',
        path: '/',
        redirect: '/forward',
        exact: true,
      },
      {
        name: 'forward',
        path: '/forward',
        component: require('/Users/zhaojin/Desktop/work/umi-electron-typescript/src/renderer/pages/Forward')
          .default,
        exact: true,
      },
      {
        name: 'intercept',
        path: '/intercept',
        component: require('/Users/zhaojin/Desktop/work/umi-electron-typescript/src/renderer/pages/Intercept')
          .default,
        exact: true,
      },
    ],
  },
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
