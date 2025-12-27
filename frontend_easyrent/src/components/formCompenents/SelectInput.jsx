export default function SelectInput({
  label,
  name,
  options,
  register,
  errors,
  isObject = false,
}) {
  return (
    <div>
      <label className="font-semibold mb-1 block">{label}</label>
      <select
        {...register(name)}
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
      >
        <option value="">Sélectionner</option>
        {options.map((o) =>
          isObject ? (
            <option key={o.id} value={o.id}>
              {o.nom}
            </option>
          ) : (
            <option key={o} value={o}>
              {o}
            </option>
          )
        )}
      </select>

      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name][0]}
        </p>
      )}
    </div>
  );
}
