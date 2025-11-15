import { FC, ReactNode } from "react";
import { Button } from "../ui/button";

interface SignInButtonProps {
  children: ReactNode;
  disabled: boolean;
}

const SignInButton: FC<SignInButtonProps> = ({ children, disabled }) => {
  return (
    <Button
      disabled={disabled}
      type="submit"
      className="w-full p-2 rounded shadow-[0_4px_4px_#D8D8D8] my-2 text-white  px-6 py-3  flex items-center gap-2 font-mono"
    >
      {children}
    </Button>
  );
};

export default SignInButton;