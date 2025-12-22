/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'flash-red': 'flash-red-alert 1s infinite',
                'shake-damage': 'shake-damage 0.4s ease-out',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                'flash-red-alert': {
                    '0%, 100%': { boxShadow: 'inset 0 0 0 0 rgba(255,0,0,0)' },
                    '50%': { boxShadow: 'inset 0 0 50px 20px rgba(255,0,0,0.5)' },
                },
                'shake-damage': {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)', filter: 'brightness(1)' },
                    '10%': { transform: 'translate(-10px, -5px) rotate(-5deg)', filter: 'brightness(2) sepia(1) hue-rotate(-50deg) saturate(5)' },
                    '20%': { transform: 'translate(10px, 5px) rotate(5deg)' },
                    '30%': { transform: 'translate(-10px, 5px) rotate(-5deg)' },
                    '40%': { transform: 'translate(10px, -5px) rotate(5deg)' },
                    '50%': { transform: 'translate(0, 0) rotate(0deg)', filter: 'brightness(1)' },
                    '100%': { transform: 'translate(0, 0) rotate(0deg)' },
                }
            }
        },
    },
    plugins: [],
}
