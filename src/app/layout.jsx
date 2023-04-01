import './globals.css';
import Providers from './providers';
import Wrappers from './wrappers';

export const metadata = {
  title: 'Quizzy',
  description: 'A quiz app for students.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Wrappers>{children}</Wrappers>
        </Providers>
      </body>
    </html>
  );
}
