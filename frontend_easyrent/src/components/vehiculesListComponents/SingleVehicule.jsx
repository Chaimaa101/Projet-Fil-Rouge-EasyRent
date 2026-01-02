import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaCogs,
  FaGasPump,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import { VehiculeContext } from "../../Context/VehiculeProvider";
import { ReservationsContext } from "../../Context/ReservationProvider";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../formCompenents/TextInput";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";

export default function VehicleDetails() {
  const { id } = useParams();
 
  const navigate =  useNavigate()
  const { vehicule, getVehicule } = useContext(VehiculeContext);
  const { user } = useContext(AuthContext);
  const { createreservations, errors } =
    useContext(ReservationsContext);

  useEffect(() => {
    getVehicule(id);
  }, [id]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: frontErrors },
  } = useForm();

    /* récupérer dates depuis react-hook-form */
  const start_date = watch("start_date");
  const end_date = watch("end_date");

  /* calcul jours */

  const days =
    start_date && end_date
      ? Math.max(
          0,
          Math.ceil(
            (new Date(end_date) - new Date(start_date)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalPrice = days * (vehicule?.prix_day || 0);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      start_date: start_date,
      end_date: end_date,
      vehicule_id: vehicule.id,
      total_price: totalPrice,
      days,
    };

    if(!user?.details){
      toast.error('Veuillez compléter votre profil pour continuer.')
    }else{
      
 const result = await createreservations(payload,id);
 if(result){
  navigate('/client/myReserv')

  }
    }

}


  return (
    <section className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* TITRE */}
        <h1 className="text-2xl font-bold mb-6">
          {vehicule?.nom} {vehicule?.marque?.nom} 
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div>
            <p className="text-teal-500 font-bold text-xl mb-4">
              {vehicule?.prix_day} DH
              <span className="text-sm text-gray-500"> / jour</span>
            </p>

            {/* Image principale */}
            {vehicule?.images?.length > 0 && (
              <img
                src={vehicule.images[0].path}
                alt="Véhicule"
                className="h-50 object-contain mx-auto mb-4"
              />
            )}

            {/* Miniatures */}
            <div className="flex gap-3 justify-center">
              {vehicule?.images?.map((img) => (
                <img
                  key={img.id}
                  src={img.path}
                  alt="miniature"
                  className="w-20 h-15 object-cover rounded border"
                />
              ))}
            </div>
 {vehicule?.description && (
              <p className="text-gray-600 text-sm mt-4">
                {vehicule.description}
              </p>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div>
            <h3 className="font-semibold mb-4">Spécifications techniques</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">

              {vehicule?.transmission && (
                <Spec
                  icon={<FaCogs />}
                  label="Boîte"
                  value={vehicule.transmission}
                />
              )}

              {vehicule?.carburant && (
                <Spec
                  icon={<FaGasPump />}
                  label="Carburant"
                  value={vehicule.carburant}
                />
              )}

              {vehicule?.seats && (
                <Spec
                  icon={<FaUsers />}
                  label="Places"
                  value={vehicule.seats}
                />
              )}

              {vehicule?.annee && (
                <Spec
                  icon={<FaCalendarAlt />}
                  label="Année"
                  value={vehicule.annee}
                />
              )}
            </div>
  <h3 className="font-semibold mb-3">Réservation</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">

                <TextInput
                  label="Date de retrait"
                  name="start_date"
                  type="date"
                  register={register}
                  rules={{ required: "Date obligatoire" }}
                  frontErrors={frontErrors}
                  backErrors={errors}
                />

                <TextInput
                  label="Date de retour"
                  name="end_date"
                  type="date"
                  register={register}
                  rules={{ required: "Date obligatoire" }}
                  frontErrors={frontErrors}
                  backErrors={errors}
                />

                <div>
                  <label>Nombre de jours</label>
                  <input
                    value={days}
                    name="days"
                    readOnly
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                  />
                </div>

                <div>
                  <label>Total à payer</label>
                  <input
                  name="total_price"
                    value={`${totalPrice} DH`}
                    readOnly
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                  />
                </div>
              </div>

              <button
                disabled={!days}
                className="mt-6 w-full bg-teal-500 text-white py-3 rounded-lg disabled:opacity-50"
              >
                Louer ce véhicule
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* COMPONENT TECHNIQUE */
const Spec = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
    <span className="text-teal-500 text-lg">{icon}</span>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium text-gray-700">{value}</p>
    </div>
  </div>
);
