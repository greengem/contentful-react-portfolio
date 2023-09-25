import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chris Waitt - Terms of Service',
  description: 'Review the terms and conditions for using Chris Waitt\'s frontend developer portfolio. Understand the guidelines and policies that govern interactions and usage of the site\'s content and resources.',
  themeColor: '#000000',
  openGraph: {
    title: 'Chris Waitt - Terms of Service',
    description: 'Review the terms and conditions for using Chris Waitt\'s frontend developer portfolio. Understand the guidelines and policies that govern interactions and usage of the site\'s content and resources.',
    url: 'https://cwaitt.dev/',
    siteName: 'Chris Waitt - Frontend Developer Portfolio',
    images: [
      {
        url: 'myimage.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_Gb',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chris Waitt - Terms of Service',
    description: 'Review the terms and conditions for using Chris Waitt\'s frontend developer portfolio. Understand the guidelines and policies that govern interactions and usage of the site\'s content and resources.',
    creator: '@cwaitt_dev',
    images: 'image.jpg',
  },
  robots: {
    index: false,
    follow: true,
    nocache: false,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: false,
      'max-video-preview': 'none',
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}

export default function TechStacksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
