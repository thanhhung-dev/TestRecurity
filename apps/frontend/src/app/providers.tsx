'use client';

import ThemeProvider from '@/components/ThemeProvider/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return (
      <AuthProvider>
        <ThemeProvider
          customTheme={{
            primaryColor: "#000000",
            neutralColor: "#18191c",
          }}
          enableCustomFonts={true}
          enableGlobalStyle={true}
          customFonts={[
            "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
          ]}
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    );
}