import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, IdCard, Save } from "lucide-react";

export default function Profile({ user, updateProfile }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    adresse: "",
    CNI: "",
    permi_lissence: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || "",
        prenom: user.prenom || "",
        email: user.email || "",
        tel: user.details?.tel || "",
        adresse: user.details?.adresse || "",
        CNI: user.details?.CNI || "",
        permi_lissence: user.details?.permi_lissence || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      alert("Profil mis à jour !");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
            <img
              src={user?.details?.profile_image || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full object-cover border-2 border-teal-300"
            />
            <h2 className="text-xl font-bold text-gray-800 mt-2">
              {user?.nom} {user?.prenom}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>

            <div className="mt-4 space-y-2 text-left">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-teal-500 mr-2" />
                <span>{user?.details?.tel || "Non renseigné"}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-teal-500 mr-2" />
                <span>{user?.details?.adresse || "Non renseigné"}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-teal-500 mr-2" />
                <span>
                  {user?.details?.date_naissance
                    ? new Date(user.details.date_naissance).toLocaleDateString()
                    : "Non renseigné"}
                </span>
              </div>
              <div className="flex items-center">
                <IdCard className="w-5 h-5 text-teal-500 mr-2" />
                <span>{user?.details?.CNI || "Non renseigné"}</span>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 text-teal-500 mr-2" />
                <span>{user?.details?.permi_lissence || "Non renseigné"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Update Form */}
        <div className="lg:w-2/3">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-800">Mettre à jour le profil</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CNI</label>
                <input
                  type="text"
                  name="CNI"
                  value={formData.CNI}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permi-lissence</label>
                <input
                  type="text"
                  name="permi_lissence"
                  value={formData.permi_lissence}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
