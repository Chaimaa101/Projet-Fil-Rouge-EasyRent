import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 text-gray-800 px-4">
      <h1 className="text-6xl font-bold text-stick">404</h1>
      <p className="text-xl mt-4">
      Oups ! La page que vous recherchez n'existe pas.
      </p>
      <Link
        onClick={() => navigate (-1)}
        className="mt-6 px-4 py-2 bg-stick text-teal-800 rounded-lg active:scale-90"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default ErrorPage;
