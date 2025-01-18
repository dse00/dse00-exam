import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DSE00 exam',
    short_name: 'DSE00',
    description: 'DSE00 exam',
    start_url: '/',
    display: 'standalone',
    background_color: '#fffcf8',
    theme_color: '#fffcf8',
    icons: [
      {
        src: '/images/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
