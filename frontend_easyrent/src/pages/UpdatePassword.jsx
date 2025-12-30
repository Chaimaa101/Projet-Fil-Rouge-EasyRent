import { useForm } from "react-hook-form";

export default function PasswordForm({ updatePassword }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await updatePassword(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h3 className="font-semibold text-lg">Change Password</h3>

      <input
        type="password"
        placeholder="Current password"
        {...register("current_password", { required: true })}
        className="input"
      />

      <input
        type="password"
        placeholder="New password"
        {...register("password", { required: true, minLength: 8 })}
        className="input"
      />

      <input
        type="password"
        placeholder="Confirm new password"
        {...register("password_confirmation", { required: true })}
        className="input"
      />

      <button className="w-full bg-red-600 text-white py-2 rounded">
        Update Password
      </button>
    </form>
  );
}
