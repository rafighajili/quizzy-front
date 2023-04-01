import Navbar from './_components/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <div className="container pt-8 pb-32">{children}</div>
      </main>
    </>
  );
}
