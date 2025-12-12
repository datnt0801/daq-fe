
// tailwind.config.js
import type { Config } from 'tailwindcss';
export default {
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3B82F6', // Màu chính (blue-500)
                    light: '#60A5FA',   // Màu sáng hơn
                    dark: '#1E40AF',    // Màu đậm hơn
                },
                secondary: {
                    DEFAULT: '#F59E0B', // Màu phụ (amber-500)
                    light: '#FBBF24',
                    dark: '#B45309',
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
