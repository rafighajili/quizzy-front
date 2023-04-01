import Button from '#/components/button';

export default function Page() {
  return (
    <main className="bg-gradient-to-bl from-neutral-700 to-neutral-900">
      <div className="container h-screen grid place-items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-8 w-2/3 sm:w-96">
          <Button href="/login">Login</Button>
          <Button href="/register">Register</Button>
        </div>
      </div>
    </main>
  );
}
