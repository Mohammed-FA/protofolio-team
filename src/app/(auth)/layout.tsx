


import Logo from "@/components/Comment/Logo";
function AuthLayout({ children }: { children: React.ReactNode }) {



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center ">
          <Logo />
        </div>
        {children}

      </div>
    </div>
  );
}

export default AuthLayout;
