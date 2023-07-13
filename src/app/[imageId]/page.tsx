import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import DownloadImageButton from "@/components/ui/download-image-button";
import { ImageType } from "@/components/types/image";

const backbuttonText = "Back to search";

interface ImageDetailsScreenProps {
  params: { imageId: string };
}

// API Call
async function fetchImage(id: string) {
  const res = await await fetch(
    `${process.env.NEXT_PUBLIC_PIXABAY_BASE_API}/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&id=${id}`
  );
  const data = await res.json();
  return data.hits[0];
}

function BackButton(): JSX.Element {
  return (
    <Link href="/">
      <div className="flex gap-2 items-center">
        <BiArrowBack />
        <div>{backbuttonText}</div>
      </div>
    </Link>
  );
}

function DisplayImage({ image }: { image: ImageType }): JSX.Element {
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
        className="rounded-lg"
        priority={true}
        blurDataURL={image.previewURL}
      />
    </div>
  );
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
  console.log("image: ", image);
  return (
    <div className="flex w-full justify-center items-center p-4">
      <div className="flex flex-col w-full max-w-4xl gap-4">
        <BackButton />
        <DisplayImage image={image} />
        <DisplayUserDetails image={image} />
      </div>
    </div>
  );
}
