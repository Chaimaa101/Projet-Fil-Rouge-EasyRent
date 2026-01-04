import { useContext, useEffect, useState } from "react";
import { FaStar, FaEdit } from "react-icons/fa"; 
import { ReservationsContext } from "../../Context/ReservationProvider";
import { Link } from "react-router-dom";
import CommentModal from "./CommentModal";
import PageHeader from "../Admin/common/PageHeader";
import GlobalLoader from "../../components/common/GlobalLoader";
import ReservationEditForm from "./ReservationForm";

export default function CarReservationCard() {
  const { reservations, loading, errors, getreservations, deletereservations } =
    useContext(ReservationsContext);

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); 
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    getreservations();
  }, []);

  const handleOpenModal = (reservation) => {
    setSelectedReservation(reservation);
    setOpenModal(true);
  };

  const handleOpenEditModal = (reservation) => {
    setSelectedReservation(reservation);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReservation(null);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedReservation(null);
  };

  const handleCancel = async (reservationId) => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
      await deletereservations(reservationId);
      getreservations(); 
    }
  };

  return (
    <>
      <PageHeader
        title="Mes Réservations"
        subtitle="Consulter et gérer mes Réservations"
        num={reservations.length}
      />
      {/* {loading && <GlobalLoader />} */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-12 gap-3">
        {reservations.map((reservation, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-teal-100 p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {reservation?.vehicule?.nom} • {reservation?.vehicule?.annee}
                  {reservation?.vehicule?.marque?.nom}
                </h2>
                <p className="text-sm text-gray-500">
                  {reservation?.days} jours
                </p>
              </div>
            </div>

            <div className="flex justify-between my-4 text-gray-600 text-sm">
              <div>
                <p className="font-semibold">À partir De:</p>
                <p>{reservation?.start_date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">à:</p>
                <p>{reservation?.end_date}</p>
              </div>
            </div>
<div className="flex justify-between">
            {reservation?.status === "paid" && (
              <button
                onClick={() => handleOpenModal(reservation)}
                className="text-teal-600 underline text-sm mb-3"
              >
                Ajouter un commentaire
              </button>
            )}
<p className="text-xl font-semibold text-teal-700 mb-4">
                {reservation?.total_price} DH
              </p></div>
      
            <div className="flex justify-between items-center">
              
              <div className="flex items-center gap-2">
                {(reservation?.status === "pending" || reservation?.status === "confirmed") && (
                  <button
                    onClick={() => handleOpenEditModal(reservation)}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition text-sm"
                    title="Modifier la réservation"
                  >
                    <FaEdit size={14} />
                    Modifier
                  </button>
                )}

                {reservation?.status === "pending" && (
                  <>
                    <Link
                      to={`/client/checkout/${reservation?.id}`}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Payer
                    </Link>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      onClick={() => handleCancel(reservation.id)}
                    >
                      Annuler
                    </button>
                  </>
                )}

                {reservation?.status === "paid" && (
                  <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-lg font-semibold">
                    Payé
                  </span>
                )}

                {reservation?.status === "cancelled" && (
                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold">
                    Annulé
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <CommentModal
          reservation={selectedReservation}
          onClose={handleCloseModal}
        />
      )}

      {openEditModal && (
        <ReservationEditForm
          reservation={selectedReservation}
          onClose={handleCloseEditModal}
          isEdit={true}
        />
      )}
    </>
  );
}