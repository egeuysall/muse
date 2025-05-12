// fonts.ts
import { Open_Sans, JetBrains_Mono } from 'next/font/google'

export const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
    display: 'swap',
})

export const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
})