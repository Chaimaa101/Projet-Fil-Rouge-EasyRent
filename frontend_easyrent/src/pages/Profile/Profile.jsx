import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../Context/AuthProvider';
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";

export default function Profile() {
  const { user, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    tel: "",
    adresse: "",
    CNI: "",
    permi_licence: "",
    genre: "",
    date_naissance: "",
    photo_profil: null,
  });

  const [previewImage, setPreviewImage] = useState("/profile.jpg");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || "",
        prenom: user.prenom || "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData(prev => ({ ...prev, photo_profil: file }));

    const reader = new FileReader();
    reader.onload = (event) => setPreviewImage(event.target.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
  setLoading(true);
  try {
    const formDataToSend = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formDataToSend.append(key, value);
      }
    });

    if (data.photo_profil) {
      formDataToSend.append("photo_profil", data.photo_profil);
    }

    await updateProfile(formDataToSend);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <ProfileCard user={user} previewImage={previewImage} />
       <ProfileForm
  onSubmit={onSubmit}
  handleFileChange={handleFileChange}
  loading={loading}
  user={user}
/>

      </div>
    </div>
  );
}
