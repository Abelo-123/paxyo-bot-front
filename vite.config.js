import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/paxyo-bot-front/', // Replace <repository-name> with your GitHub repository name
    plugins: [react()],
    server: {
        proxy: {
            '/api': 'https://paxyo-bot-ywuk.onrender.com'
        }
    }
});
