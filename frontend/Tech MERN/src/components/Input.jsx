function Input({ type, id, placeholder, onChange, className }) {
  return (
    <>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
      />
    </>
  );
}

export default Input;
