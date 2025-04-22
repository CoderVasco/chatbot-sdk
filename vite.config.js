// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/chatbot.js',
      name: 'MyChatBot',
      fileName: 'chatbot',
      formats: ['iife'], // Gera script global
    },
  },
});
