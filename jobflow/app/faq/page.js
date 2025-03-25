export default function FAQ() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-500">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        <div>
          <p className="text-gray-700">Q: What is Job Application Tracker?</p>
          <p className="text-gray-700">A: It's an app to log and manage your job applications.</p>
        </div>

        <div>
          <p className="text-gray-700">Q: Is there an app I can download?</p>
          <p className="text-gray-700">
            A: As of now, we are focusing solely on a website. But in the future, there are plans to launch an app.
          </p>
        </div>

        <div>
          <p className="text-gray-700">Q: What should I do if I forget my password?</p>
          <p className="text-gray-700">
            A: We have an option to reset your password. Click "Reset Password," and a link will be sent to your email.
          </p>
        </div>

        <div>
          <p className="text-gray-700">Q: How can i ensure that my data isn't be sold to third parties?</p>
          <p className="text-gray-700">A:still haven't figured that out.</p>
        </div>

        <div>
          <p className="text-gray-700">Q: Is there a limit on how many applications can be tracked?</p>
          <p className="text-gray-700">A: No there is no limit on how many applications can be tracked.You can apply to 1000 jobs and we will keep track of all your applications.</p>
        </div>
      </div>
    </div>
    
  );
}