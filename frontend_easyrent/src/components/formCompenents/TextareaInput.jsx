export default function TextareaInput({
  label,
  name,
  register,
  errors,
}) {
  return (
    <div>
      <label className="font-semibold mb-1 block">{label}</label>
      <textarea
        {...register(name)}
        rows={4}
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name][0]}
        </p>
      )}
    </div>
  );
}
