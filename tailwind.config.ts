const config: {
  plugins: any[];
  theme: {
    extend: {
      backgroundImage: { 'gradient-conic': string; 'gradient-radial': string };
      colors: any;
    };
  };
  content: string[];
} = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: 'var(--color-primary)',
        'primary-80': 'var(--color-primary-80)',
        'tertiary-10': 'var(--color-tertiary-10)',
        'tertiary-20': 'var(--color-tertiary-20)',
        'tertiary-30': 'var(--color-tertiary-30)',
        'tertiary-40': 'var(--color-tertiary-40)',
        'tertiary-50': 'var(--color-tertiary-50)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        quaternary: 'var(--color-quaternary)',
        'quaternary-light': 'var(--color-quaternary-light)',
        'quaternary-20': 'var(--color-quaternary-20)',
        'quaternary-100': 'var(--color-quaternary-100)',
        quinary: 'var(--color-quinary)',
        'quinary-50': 'var(--color-quinary-50)',
        success: 'var(--color-success)',
        black: 'var(--color-black)',
        'black-25': 'var(--color-black-25)',
        'black-50': 'var(--color-black-50)',
        'black-70': 'var(--color-black-70)',
        white: 'var(--color-white)',
        'white-50': 'var(--color-white-50)',
        error: 'var(--color-error)',
      },
    },
  },
  plugins: [],
};

export default config;
