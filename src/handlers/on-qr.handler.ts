export const handler = async (qr: string) => {
  const QRCode = await import('qrcode');

  QRCode.toString(
    qr,
    {
      small: true,
      type: 'terminal',
    },
    (error, url) => {
      if (error instanceof Error) {
        throw error;
      }

      console.log(url);
    },
  );
};
