import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <>
      <p>{error.message}</p>
      <p>{error.data}</p>
      <Link to="/">Back to home</Link>
    </>
  );
}
