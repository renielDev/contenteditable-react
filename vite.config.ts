import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    lib : {
      entry: "src/components/ContentEditable.tsx",
      name: "contenteditable-react",
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `contenteditable-react.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
      },
    },
  }
})
