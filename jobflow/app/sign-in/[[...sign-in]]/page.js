import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
