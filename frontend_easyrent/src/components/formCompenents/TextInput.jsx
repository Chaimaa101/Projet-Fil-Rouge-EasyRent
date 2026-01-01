import { useState, useEffect } from "react";
import { Save, User, Phone, MapPin, Calendar, IdCard } from "lucide-react";
import TextInput from "./TextInput"; // your component

export default function Profile({ user, updateProfile, register, frontErrors, backErrors }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    adresse: "",
    CNI: "",
    permi_licence: "",
    genre: "",
    date_naissance: "",
    photo_profil: null,
  });

  const [previewImage, setPreviewImage] = useState("/default-profile.png");
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
        permi_licence: user.details?.permi_licence || "",
        genre: user.details?.genre || "",
        date_naissance: user.details?.date_naissance || "",
        photo_profil: null,
      });
      if (user.details?.photo_profil) setPreviewImage(user.details.photo_profil);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo_profil: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) dataToSend.append(key, value);
    });

    try {
      await updateProfile(dataToSend);
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
              src={previewImage}
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
                <span>{user?.details?.permi_licence || "Non renseigné"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Update Form */}
        <div className="lg:w-2/3">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Mettre à jour le profil</h3>

            <TextInput
              label="Nom"
              name="nom"
              type="text"
              placeholder="Votre nom"
              register={() => ({})}
              frontErrors={{}}
              backErrors={{}}
              value={formData.nom}
              onChange={handleChange}
            />
            <TextInput
              label="Prénom"
              name="prenom"
              type="text"
              placeholder="Votre prénom"
              register={() => ({})}
              frontErrors={{}}
              backErrors={{}}
              value={formData.prenom}
              onChange={handleChange}
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Votre email"
              register={() => ({})}
              frontErrors={{}}
              backErrors={{}}
              value={formData.email}
              onChange={handleChange}
            />
            <TextInput
              label="Téléphone"
              name="tel"
              type="tel"
              placeholder="Votre téléphone"
              register={() => ({})}
              frontErrors={{}}
              backErrors={{}}
              value={formData.tel}
              onChange={handleChange}
            />
            <TextInput
              label="Adresse"
              name="adresse"
              type="text"
              placeholder="Votre adresse"
              register={() => ({})}
              frontErrors={{}}
              backErrors={{}}
              value={formData.adresse}
              onChange={handleChange}
            />
            <TextInput
              label="CNI"
              name="CNI"
              type="text"
              placeholder="Votre CNI"
              register={() => ({})}
              frontErrors={{}}
              backErrors={{}}
              value={formData.CNI}
              onChange={handleChange}
            />
            <TextInput
              label="Permi-licence"
              name="permi_licence"
              type="text"
              placeholder="Votre permis de conduire"
              register={() => ({})}
              frontErrors={{}}
              backErrors={{}}
              value={formData.permi_licence}
              onChange={handleChange}
            />
            <TextInput
              label="Genre"
              name="genre"
              type="text"
              placeholder="homme / femme"
              register={() => ({})}
              frontErrors={{}}
              backErrors={{}}
              value={formData.genre}
              onChange={handleChange}
            />
            <TextInput
              label="Date de naissance"
              name="date_naissance"
              type="date"
              placeholder=""
              register={() => ({})}
              frontErrors={{}}
              backErrors={{}}
              value={formData.date_naissance}
              onChange={handleChange}
            />

            <div>
              <label className="block mb-1 font-medium">Photo de profil</label>
              <input type="file" onChange={handleFileChange} />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
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
