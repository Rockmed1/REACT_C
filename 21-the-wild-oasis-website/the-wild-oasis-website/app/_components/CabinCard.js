import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="border-primary-800 flex border">
      <div className="relative flex-1">
        <Image
          src={image}
          fill // because the image variable is a string coming from the database so we need to use technique 2 trick. another option is to use size prop
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={`Cabin ${name}`}
          className="object cover border-primary-800 flex-1 border-r"
        />
      </div>
      <div className="flex-grow">
        <div className="bg-primary-950 px-7 pt-5 pb-4">
          <h3 className="text-accent-500 mb-3 text-2xl font-semibold">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-3">
            <UsersIcon className="text-primary-600 h-5 w-5" />
            <p className="text-primary-200 text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline justify-end gap-3">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="text-primary-600 font-semibold line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t-primary-800 border-t text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-primary-800 hover:bg-accent-600 hover:text-primary-900 inline-block border-l px-6 py-4 transition-all"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
