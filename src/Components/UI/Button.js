import { useNavigate } from "react-router-dom";

const Button = ({ children }) => {
  const nav = useNavigate();
  return (
    <button className="bg-primary transition hover:bg-[#158ace] px-8 py-1 shadow-lg rounded-3xl text-white">
      {children}
    </button>
  );
};

export default Button;
