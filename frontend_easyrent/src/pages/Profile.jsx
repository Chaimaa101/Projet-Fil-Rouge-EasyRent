import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";

// Reusable Input Component
const InputField = ({ label, type, id, value, onChange, placeholder, error }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700" htmlFor={id}>
      {label}
    </label>
    <input
      className={`bg-white border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default function Profile() {
const {user,errors}= useContext(AuthContext)
  const { formData} = useState({
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    password: '',
    password_confirmation: '',
  });

  const [previewImage, setPreviewImage] = useState(user.details || '/default-profile.png');


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="flex-1 relative overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200"
        >
          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
      
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="profile_image"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <span className="text-white text-sm font-medium">Change</span>
                </label>
              </div>
              {errors.profile_image && (
                <p className="text-red-500 text-sm">{errors.profile_image}</p>
              )}
              <h2 className="text-2xl font-bold text-gray-800">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="First Name"
                type="text"
                id="firstname"
                value={data.firstname}
                onChange={(e) => setData('firstname', e.target.value)}
                placeholder="Enter your first name"
                error={errors.firstname}
              />
              <InputField
                label="Last Name"
                type="text"
                id="lastname"
                value={data.lastname}
                onChange={(e) => setData('lastname', e.target.value)}
                placeholder="Enter your last name"
                error={errors.lastname}
              />
              <InputField
                label="Email Address"
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="Enter your email"
                error={errors.email}
              />
              <InputField
                label="New Password (leave blank to keep current)"
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Enter a new password"
                error={errors.password}
              />
              <InputField
                label="Confirm Password"
                type="password"
                id="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                placeholder="Confirm your new password"
              />
            </div>

            {/* Save Changes Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              disabled={processing}
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-md font-semibold hover:from-blue-600 hover:to-blue-700 transition-all ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {processing ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
