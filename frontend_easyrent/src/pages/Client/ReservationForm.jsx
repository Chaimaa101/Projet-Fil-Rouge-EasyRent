import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReservationsContext } from "../../Context/ReservationProvider";
import { VehiculeContext } from "../../Context/VehiculeProvider";
import TextInput from "../../components/formCompenents/TextInput";

export default function ReservationEditForm({ reservation, onClose }) {
  const { updatereservations, loading, errors } =
    useContext(ReservationsContext);

  const { register, handleSubmit, reset, watch, formState: { errors: frontErrors } } = useForm();

  const start_date = watch("start_date");
  const end_date = watch("end_date");

  useEffect(() => {
    if (reservation) {
      reset({
        start_date: reservation.start_date,
        end_date: reservation.end_date,
        days : reservation.days,
        total_price : reservation.total_price
      });
    }
  }, [reservation, reset]);

  
 
  const jours =
    start_date && end_date
      ? Math.max(
          0,
          Math.ceil(
            (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalPrice = jours * (reservation?.vehicule?.prix_day || 0);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      days : jours,
      total_price: totalPrice,
    };
 console.log("Submitting payload:", payload); 
    const result = await updatereservations(reservation.id, payload);
    if (result) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Modifier la réservation
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <TextInput
            label="Date de début"
            name="start_date"
            type="date"
            register={register}
            rules={{ required: "Date obligatoire" }}
            frontErrors={frontErrors}
            backErrors={errors}
          />

          <TextInput
            label="Date de fin"
            name="end_date"
            type="date"
            register={register}
            rules={{ required: "Date obligatoire" }}
            frontErrors={frontErrors}
            backErrors={errors}
          />


          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Nombre de jours</span>
              <span className="font-semibold">{jours}</span>
            </div>

            <div className="flex justify-between">
              <span>Prix / jour</span>
              <span className="font-semibold">{reservation?.vehicule?.prix_day || 0} DH</span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Total</span>
              <span className="font-bold text-blue-600">{totalPrice} DH</span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={jours === 0}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg"
            >
              {loading ? "Enregistrement..." : "Mise à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
