import { useContext, useEffect } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { AvisContext } from "../../Context/AvisProvider";
import GlobalLoader from "../../components/common/GlobalLoader";
import PageHeader from "../Admin/common/PageHeader";
import { MdEdit } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";

export default function MesAvis() {
  const { mesAvis = [], loading, errors, getMesAvis, deleteAvis } = useContext(AvisContext);

  useEffect(() => {
    getMesAvis();
  }, []);


  const navigate = useNavigate()


  return (
    <>
     <PageHeader
            title="Mes commentaires"
            subtitle="Consulter et gérer mes commentaire"
            num={mesAvis.length}
          />
      {loading && <GlobalLoader />}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {mesAvis.map((avi, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md border border-teal-100 p-6 hover:shadow-lg transition"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{avi?.avis}</h2>
              
              <p className="text-sm text-gray-500">
                Reservation #{avi?.reservation?.id} - Vehicule #{avi?.reservation?.vehicule_id}
              </p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <FaStar />
              <span>{avi?.rating || 5}</span>
            </div>

          </div>

          <p
            className="px-4 py-2 rounded-lg ">
            Status: {avi.isPublic ? "Public" : "Non public"}
          </p>

          <button
            onClick={() => navigate('/error')}
            className="mt-2 mx-6 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <MdEdit />
          </button>
           <button
            onClick={() => deleteAvis(avi.id)}
            className="mt-2 bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <FaTrash/>
          </button>
        </div>
      ))}
    </div>
    </>
  );
}
