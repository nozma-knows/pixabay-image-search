"use client";

import { ImageType } from "@/components/types/image";
import Image from "next/image";
import { useState } from "react";

export default function DisplayFullImage({
  image,
}: {
  image: ImageType;
}): JSX.Element {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={`flex w-full h-full relative ${
        image.largeImageURL.endsWith(".png") && "checkered"
      } p-4 rounded-lg`}
      style={{
        aspectRatio: `${image.imageWidth}/${image.imageHeight}`,
      }}
    >
      <Image
        src={image.largeImageURL}
        alt={image.tags}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`rounded-lg ${loading && "bg-white/20 animate-pulse"}`}
        blurDataURL={image.previewURL}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
