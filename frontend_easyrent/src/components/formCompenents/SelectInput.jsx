export default function SelectInput({
  label,
  name,
  options = [],
  isObject = false,
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

      <select
        {...register(name, rules)}
        className={`w-full px-4 py-2 border rounded-md
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      >
        <option value="">-- Sélectionner --</option>
        {options.map((opt) =>
          isObject ? (
            <option key={opt.id} value={opt.id}>
              {opt.nom}
            </option>
          ) : (
            <option key={opt} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
