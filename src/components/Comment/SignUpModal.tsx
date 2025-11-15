import SignUpForm from "./SignUpForm";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  return <SignUpForm type="signup" isOpen={isOpen} onClose={onClose} />;
}
