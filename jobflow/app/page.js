import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const username = user?.username;
  const welcomeSuffix = username ? `, ${username}` : '';

  return (
    <div className="p-4">
      <h1>Welcome{welcomeSuffix} 👋!</h1>
      <p>Welcome to your job tracker dashboard!</p>
    </div>

    
  );
}
