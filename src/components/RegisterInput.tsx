
interface RegisterInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  disabled?: boolean;
}

export const RegisterInput = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  disabled
}: RegisterInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-white">{label}:</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 rounded-lg bg-white text-black ${error ? 'border-2 border-red-500' : ''}`}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
