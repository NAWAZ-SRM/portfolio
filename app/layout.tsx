import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Orbitron } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron'
});

export const metadata: Metadata = {
  title: 'Nawaz Sheriff K N | ML Engineer & Full-Stack Developer',
  description: 'Portfolio of Nawaz Sheriff K N - Machine Learning Engineer, Full-Stack Architect, and Deep Learning Innovator. B.Tech CSE student at SRM IST with CGPA 9.39/10. Currently Zoho Project Trainee.',
  keywords: ['Machine Learning', 'Full Stack Developer', 'Deep Learning', 'Python', 'React', 'PyTorch', 'TensorFlow'],
  authors: [{ name: 'Nawaz Sheriff K N' }],
  openGraph: {
    title: 'Nawaz Sheriff K N | ML Engineer & Full-Stack Developer',
    description: 'Machine Learning Engineer, Full-Stack Architect, and Deep Learning Innovator',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
