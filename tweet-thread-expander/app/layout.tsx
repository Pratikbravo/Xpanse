export const metadata = {
  title: "AI Tweet Thread Expander",
  description: "Turn a topic into a numbered X/Twitter thread",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}