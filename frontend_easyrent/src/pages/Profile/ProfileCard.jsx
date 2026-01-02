import {  User, Phone, MapPin, Calendar, IdCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileCard({ user, previewImage }) {
  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
        <img
        src={previewImage || user?.details?.photo_profil || '/profile.jpg'}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full object-cover border-2 border-teal-300"
        />
        <h2 className="text-xl font-bold text-gray-800 mt-2">
          {user?.nom} {user?.prenom}
        </h2>
        <p className="text-gray-500 text-sm">{user?.email}</p>

        <div className="my-4 space-y-2 text-left">
          <InfoRow icon={Phone} value={user?.details?.tel} fallback="Non renseigné" />
          <InfoRow icon={MapPin} value={user?.details?.adresse} fallback="Non renseigné" />
          <InfoRow
            icon={Calendar}
            value={
              user?.details?.date_naissance
                ? new Intl.DateTimeFormat("fr-FR").format(new Date(user.details.date_naissance))
                : null
            }
            fallback="Non renseigné"
          />
          <InfoRow icon={IdCard} value={user?.details?.CNI} fallback="Non renseigné" />
          <InfoRow icon={User} value={user?.details?.permi_licence} fallback="Non renseigné" />
        </div>
         <Link to="/error"  className="text-pink-800 text-center underline ">
      <a href="">Changer le mot de passe </a>
      </Link>
      </div>
     
    </div>
  );
}

// Info row with icon
function InfoRow({ icon: Icon, value, fallback }) {
  return (
    <div className="flex items-center mt-3">
      <Icon className="w-5 h-5 text-teal-500 mr-2" />
      <span>{value || fallback}</span>
    </div>
  );
}
