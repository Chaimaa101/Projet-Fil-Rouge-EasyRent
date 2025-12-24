import { useState } from "react";

export default function CompleteDetails() {
  const [photo, setPhoto] = useState(null);
  const [permis, setPermis] = useState(null);

  const [form, setForm] = useState({
    email: "",
    confirmEmail: "",
    cin: "",
    telephone: "",
    naissance: "",
    genre: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handlePermisChange = (e) => {
    const file = e.target.files[0];
    if (file) setPermis(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ form, photo, permis });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg">
        <h1 className="text-center text-lg font-semibold mb-6">Completer ton profil</h1>

        {/* Photo de profil */}
        <div className="flex flex-col items-center mb-6">
          <label className="relative cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {photo ? (
                <img src={photo} alt="profil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-sm">Photo de profil</span>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>

        {/* Champs */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="input"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Adresse e-mail"
            type="email"
            required
          />

          <input
            className="input"
            name="confirmEmail"
            value={form.confirmEmail}
            onChange={handleChange}
            placeholder="Confirmation Adresse e-mail"
            type="email"
            required
          />

          <input
            className="input"
            name="cin"
            value={form.cin}
            onChange={handleChange}
            placeholder="CIN"
            required
          />

          <input
            className="input"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            placeholder="Téléphone"
            required
          />

          <input
            className="input"
            name="naissance"
            value={form.naissance}
            onChange={handleChange}
            type="date"
            required
          />

          <select
            className="input"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            required
          >
            <option value="">Genre</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
        </div>

        {/* Permis */}
        <div className="mt-4">
          <label className="block text-sm mb-1">Permis</label>
          <input type="file" accept="image/*,.pdf" onChange={handlePermisChange} />

          {permis && (
            <div className="mt-3 border rounded p-2">
              {permis.type === "application/pdf" ? (
                <embed
                  src={URL.createObjectURL(permis)}
                  type="application/pdf"
                  className="w-full h-40"
                />
              ) : (
                <img
                  src={URL.createObjectURL(permis)}
                  alt="permis"
                  className="h-40 object-contain"
                />
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-teal-400 hover:bg-teal-500 text-white py-2 rounded"
        >
          Soumettre
        </button>

        {/* Styles */}
        <style jsx>{`
          .input {
            @apply bg-gray-100 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 w-full;
          }
        `}</style>
      </form>
    </div>
  );
}
