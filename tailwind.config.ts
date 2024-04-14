import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'neon-purple': {
                    DEFAULT: '#9B5DE5',
                },
                'neon-pink': {
                    DEFAULT: '#F15BB5',
                },
                'neon-yellow': {
                    DEFAULT: '#FEE440',
                },
                'neon-blue': {
                    DEFAULT: '#00BBF9',
                },
                'neon-turquoise': {
                    DEFAULT: '#00F5D4',
                },
                accent: '#ff5733',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        borderRadius: {
            none: '0',
            sm: '0.125rem',
            DEFAULT: '0.25rem',
            md: '0.375rem',
            lg: '10px',
            full: '9999px',
            large: '12px',
        },
    },
    plugins: [],
}
export default config
