import { useContext, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { AvisContext } from "../../Context/AvisProvider";
import GlobalLoader from "../../components/common/GlobalLoader";
import PageHeader from "../Admin/common/PageHeader";

export default function MesAvis() {
  const { mesAvis = [], loading, errors, getMesAvis, deleteAvis } = useContext(AvisContext);

  useEffect(() => {
    getMesAvis();
  }, []);


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
            onClick={() => deleteAvis(avi.id)}
            className="mt-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
    </>
  );
}
