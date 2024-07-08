import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import FullReload from "vite-plugin-full-reload";
import viteCompression from "vite-plugin-compression";


const pictureSuffix =
    /\jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg$/;

export default defineConfig({
      server: {
        host: "0.0.0.0",
        port: 3000,
        open: true,
        https: false,
        proxy: {},
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      plugins: [
        vue(),
        viteCompression({
          algorithm: 'gzip',
          ext: '.gz',
          threshold: 10240,
          deleteOriginFile: false,
        }),
        FullReload(["config/routes.rb", "app/views/**/*"]),
      ],
      build: {
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
          output: {
            assetFileNames(chunkInfo) {
              if (chunkInfo.name) {
                const [name, ext] = path.basename(chunkInfo.name).split(".");
                return `static/${
                    pictureSuffix.test(ext?.toLowerCase()) ? "images" : ext
                }/${name?.toLowerCase()}-[hash].${ext}`;
              }
              return "";
            },
            chunkFileNames(chunkInfo) {
              let timestr = Date.now();
              return "chunks/[name]-[hash]-" + timestr + ".js";
            },
            entryFileNames() {
              let timestr = Date.now();
              return "entries/[name]-[hash]-" + timestr + ".js";
            },
          },
        },
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
        sourcemap: false,
        minify: 'terser',
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "@/Assets/Styles/global.scss";`,
          },
        },
      },
    }
)
