import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";
import TextInput from "../components/formCompenents/TextInput";

export default function Profile() {
  const { user, errors, updateProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const [previewImage, setPreviewImage] = useState(
    user?.details?.profile_image || "/default-profile.png"
  );

  const [loading, setLoading] = useState(false);

  /* Fill form when user loads */
  useEffect(() => {
    if (user) {
      reset({
        nom: user.nom || "",
        prenom: user.prenom || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [user, reset]);

  /* Image change */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setValue("profile_image", file);

    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);
  };

  /* Submit */
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await updateProfile(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-4xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-2xl border"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Profile image */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border">
                <img
                  src={previewImage}
                  className="w-full h-full object-cover"
                  alt="Profile"
                />

                <input
                  type="file"
                  id="profile_image"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />

                <label
                  htmlFor="profile_image"
                  className="absolute inset-0 flex items-center justify-center
                             bg-black/50 text-white opacity-0 hover:opacity-100
                             cursor-pointer transition"
                >
                  Change
                </label>
              </div>

              {errors?.profile_image && (
                <p className="text-red-500 text-sm">
                  {errors.profile_image[0]}
                </p>
              )}

              <h2 className="text-xl font-bold">
                {user?.nom} {user?.prenom}
              </h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="First Name"
                name="nom"
                register={register}
                errors={errors}
              />

              <TextInput
                label="Last Name"
                name="prenom"
                register={register}
                errors={errors}
              />

              <TextInput
                label="Email"
                type="email"
                name="email"
                register={register}
                errors={errors}
              />

              <TextInput
                label="New Password"
                type="password"
                name="password"
                register={register}
                errors={errors}
              />

              <TextInput
                label="Confirm Password"
                type="password"
                name="password_confirmation"
                register={register}
                errors={errors}
              />
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold
                         hover:bg-teal-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
