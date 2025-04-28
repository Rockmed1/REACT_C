import { auth } from "../_lib/auth";

//this will override the main metadata
export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();

  const firstName = session.user.name.split(" ").at(0);
  return (
    <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
      Welcome {firstName}
    </h2>
  );
}
