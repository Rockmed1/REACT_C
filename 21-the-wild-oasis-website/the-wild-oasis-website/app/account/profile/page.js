import UpdateProfileForm from "@/_starter/components/UpdateProfileForm";
import SelectCountry from "@/app/_components/SelectCountry";

export const metadata = {
  title: "Update profile",
};

export default function Page() {
  // CHANGE
  const countryFlag = "pt.jpg";
  const nationality = "portugal";
  return (
    <div>
      <h2 className="text-accent-400 mb-4 text-2xl font-semibold">
        Update your guest profile
      </h2>

      <p className="text-primary-200 mb-8 text-lg">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      {/* using a client component inside a server component in order to have state in the form */}
      <UpdateProfileForm>
        {/* passing the server component as a prop into a client component is the only way this is allowed */}
        <SelectCountry
          name="nationality"
          id="nationality"
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
