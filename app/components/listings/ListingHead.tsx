'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  currentUser?: SafeUser | null
  title: string
  imageSrc: string
  locationValue: string
  id: string
}

const ListingHead: React.FC<ListingHeadProps> = ({
  currentUser,
  title,
  imageSrc,
  locationValue,
  id
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div className="w-full h-[60vh] overflow-hidden relative rounded-xl">
        <Image alt="image" src={imageSrc} fill className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead;