export default function TextareaInput({
  label,
  name,
  register,
  frontErrors = {},
  backErrors = {},
  rules = {},
}) {
  const error =
    frontErrors?.[name]?.message || backErrors?.[name]?.[0];

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>

      <textarea
        {...register(name, rules)}
        className={`w-full px-4 py-2 border rounded-md
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
