import { defineConfig } from 'umi';
import routes from '../routes';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  proxy: {
    '/api/': {
      target: 'https://mcn.zhihu.dev/',
      changeOrigin: true,
    },
  },
});
