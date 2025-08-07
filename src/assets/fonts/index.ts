import localFont from 'next/font/local';

export const customFonts = localFont({
  src: [
    {
      path: './BwModelicaLGC-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './BwModelicaLGC-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './BwModelicaLGC-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './BwModelicaLGC-Medium.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './BwModelicaLGC-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './BwModelicaLGC-ExtraBold.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
});
