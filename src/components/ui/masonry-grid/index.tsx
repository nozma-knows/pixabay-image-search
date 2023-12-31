"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { Masonry } from "@mui/lab";

import { ImageType } from "@/components/types/image";
import { StateContext } from "@/context/state.context";
import Button from "@/components/ui/button";
import { motion } from "framer-motion";

import "./index.css";

const likedImagesTitle = "Favorites";

interface GridItemProps {
  image: ImageType;
}

// UI
function UpdateLiked(
  image: ImageType,
  liked: ImageType[],
  setLiked: (i: ImageType[]) => void
) {
  if (liked.find((item) => item.id === image.id)) {
    setLiked(liked.filter((item) => item.id !== image.id));
  } else {
    setLiked([...liked, image]);
  }
}

function GridItem({ image }: GridItemProps): JSX.Element {
  const router = useRouter();
  const { id, tags, previewURL, previewWidth, previewHeight } = image;
  const { liked, setLiked } = useContext(StateContext);
  const isLiked = liked.find((item) => item.id === image.id);
  const [hoveringHeart, setHoveringHeart] = useState(false);

  return (
    <motion.div
      className="flex w-full relative cursor-pointer"
      onClick={() => !hoveringHeart && router.push(`/${id}`)}
      style={{
        aspectRatio: `${previewWidth}/${previewHeight}`,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={!hoveringHeart ? { scale: 0.95 } : {}}
    >
      <motion.div
        className="flex w-full h-full absolute z-10 rounded-lg p-2 justify-end"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))`,
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div
          className="flex w-8 h-8"
          onMouseEnter={() => setHoveringHeart(true)}
          onMouseLeave={() => setHoveringHeart(false)}
        >
          {isLiked ? (
            <BiSolidHeart
              className="w-full h-full text-white"
              onClick={() => UpdateLiked(image, liked, setLiked)}
            />
          ) : (
            <BiHeart
              className="w-full h-full text-white"
              onClick={() => UpdateLiked(image, liked, setLiked)}
            />
          )}
        </div>
      </motion.div>
      <div
        className={`flex w-full h-full relative p-4 rounded-lg ${
          previewURL.endsWith(".png") && "checkered"
        }`}
      >
        <Image
          src={previewURL}
          alt={tags}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg"
        />
      </div>
    </motion.div>
  );
}

function LikedImagesView(): JSX.Element {
  const { liked } = useContext(StateContext);
  return (
    <div>
      <h1>{likedImagesTitle}</h1>
      <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
        {liked.map((image, index) => (
          <div key={index}>
            <GridItem image={image} />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

function SearchedImagesView(): JSX.Element {
  const { viewing, images } = useContext(StateContext);
  return (
    <div>
      {viewing && <h1>{`Currently viewing - ${viewing}`}</h1>}
      <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
        {images.map((image, index) => (
          <div key={index}>
            <GridItem image={image} />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

function ShowMoreButton(): JSX.Element {
  const { images, hits, handleGrabMore } = useContext(StateContext);
  return (
    <div className="flex w-full justify-center">
      {Boolean(images.length) && images.length < hits && (
        <Button
          tooltip={{ title: "Show more images", placement: "bottom" }}
          onClick={handleGrabMore}
        >
          <div>Show me more!</div>
        </Button>
      )}
    </div>
  );
}

export default function MasonryGrid(): JSX.Element {
  const { showLiked } = useContext(StateContext);

  return (
    <div id="masonry-grid" className="masonry-grid">
      {showLiked && <LikedImagesView />}
      <SearchedImagesView />
      <ShowMoreButton />
    </div>
  );
}
