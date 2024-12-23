import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl mb-3">404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-500">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
