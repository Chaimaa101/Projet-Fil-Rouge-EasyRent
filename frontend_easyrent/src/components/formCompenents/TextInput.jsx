export default function TextInput({ label, register, error, type = "text", placeholder }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        {...register} 
        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
