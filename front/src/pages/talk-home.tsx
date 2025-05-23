import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const Talk = () => {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button type="button" onClick={logout}>
        Logout
      </button>
      <h1 className="text-xl font-bold mb-8 text-white text-center">
        Bienvenue sur TalksCenter
      </h1>
      <p className="text-gray-300 mb-8 text-center max-w-md">
        Créez et partagez vos talks avec la communauté. Cliquez sur le bouton
        ci-dessous pour commencer.
      </p>
      <div className="flex gap-4">
        <Link
          to="/create-talk"
          className="bg-red-600 text-white py-3 px-6 rounded-lg flex items-center 
                   transition-transform hover:scale-105 active:scale-95"
        >
          <IoAdd className="mr-2 text-white" size={20} />
          <span className="text-white">Créer un talk</span>
        </Link>
        <Link
          to="/talk-list"
          className="bg-white text-black py-3 px-6 rounded-lg flex items-center 
                   transition-transform hover:scale-105 active:scale-95"
        >
          <span className="text-black">Modifier un talk</span>
        </Link>
      </div>
    </div>
  );
};
