import { useRouteError, Link } from 'react-router-dom';
import MainHeader from '../components/MainHeader';

function Error() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong.';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <MainHeader />
      <main className="error-content">
        <h1>{title}</h1>
        <p>{message}</p>
        <p>
          <Link to="/" className="button">Go back to safety</Link>
        </p>
      </main>
    </>
  );
}

export default Error;
