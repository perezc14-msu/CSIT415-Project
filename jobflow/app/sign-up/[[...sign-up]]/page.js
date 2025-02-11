// app/signin/page.js
import { SignUp} from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div> 
      <SignUp />
      </div> 
    </div>
  );
};

export default SignUpPage;