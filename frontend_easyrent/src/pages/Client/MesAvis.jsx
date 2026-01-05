import { useContext, useEffect, useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { AvisContext } from "../../Context/AvisProvider";
import GlobalLoader from "../../components/common/GlobalLoader";
import PageHeader from "../Admin/common/PageHeader";
import CommentModal from "./CommentModal";

export default function MesAvis() {
  const {
    mesAvis = [],
    loading,
    getMesAvis,
    deleteAvis,
  } = useContext(AvisContext);

  const [openModal, setOpenModal] = useState(false);
  const [selectedAvis, setSelectedAvis] = useState(null);

  useEffect(() => {
    getMesAvis();
  }, []);

  const handleEdit = (avi) => {
    setSelectedAvis(avi);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAvis(null);
    getMesAvis();
  };

  return (
    <>
      <PageHeader
        title="Mes commentaires"
        subtitle="Consulter et gérer mes commentaires"
        num={mesAvis.length}
      />

      {loading && <GlobalLoader />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {mesAvis.map((avi) => (
          <div
            key={avi.id}
            className="bg-white rounded-xl shadow-md border border-teal-100 p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {avi.avis}
                </h2>
                <p className="text-sm text-gray-500">
                  Réservation #{avi?.reservation?.id}
                </p>
              </div>

              <div className="flex items-center gap-1 text-yellow-500">
                <FaStar />
                <span>{avi.rating}</span>
              </div>
            </div>

            <p className="mb-3 text-sm">
              Status : {avi.isPublic ? "Public" : "Non public"}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEdit(avi)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <MdEdit />
              </button>

              <button
                onClick={() => deleteAvis(avi.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {openModal && selectedAvis && (
        <CommentModal
          avi={selectedAvis}
          reservation={selectedAvis.reservation}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
