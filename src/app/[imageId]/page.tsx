import Image from "next/image";
import DownloadImageButton from "@/components/ui/download-image-button";
import { ImageType } from "@/components/types/image";
import BackButton from "@/components/ui/back-button";
import { useState } from "react";
import DisplayFullImage from "@/components/ui/display-full-image";

const backbuttonText = "Back to search";

interface ImageDetailsScreenProps {
  params: { imageId: string };
}

const title = "Image Details View";

// API Call
async function fetchImage(id: string) {
  const res = await await fetch(
    `${process.env.NEXT_PUBLIC_PIXABAY_BASE_API}/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&id=${id}`
  );
  const data = await res.json();
  return data.hits[0];
}

function DisplayUserDetails({ image }: { image: ImageType }): JSX.Element {
  return (
    <div className="flex w-full h-full items-center justify-between text-white">
      <div className="flex items-center gap-4">
        {image.userImageURL && (
          <div className="flex w-14 h-14 relative">
            <Image
              src={image.userImageURL}
              alt={image.user}
              fill
              className="rounded-full"
              priority={true}
            />
          </div>
        )}
        <div className="text-2xl">{`${!image.userImageURL ? "User - " : ""}${
          image.user
        }`}</div>
      </div>
      <div className="flex h-full items-center gap-8">
        <div className="flex  gap-2">
          {image.tags.split(",").map((tag) => {
            return (
              <div
                key={tag}
                className="flex w-fit h-fit px-4 py-2 items-center rounded-full bg-white/80 text-black"
              >
                {tag}
              </div>
            );
          })}
        </div>
        <DownloadImageButton url={image.largeImageURL} />
      </div>
    </div>
  );
}

export default async function ImageDetailsScreen({
  params,
}: ImageDetailsScreenProps) {
  const { imageId } = params; // Descructure the imageId from the params object
  const image = await fetchImage(imageId);

  if (!image) {
    <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col w-full justify-center items-center p-4">
      <h1 className="flex p-8">{title}</h1>
      <div className="flex flex-col w-full max-w-4xl gap-8">
        <BackButton label={backbuttonText} />
        <div className="flex flex-col gap-4">
          <DisplayFullImage image={image} />
          <DisplayUserDetails image={image} />
        </div>
      </div>
    </div>
  );
}
