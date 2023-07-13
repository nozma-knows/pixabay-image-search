"use client";

import { createContext, useState, ReactNode } from "react";
import { ImageType } from "@/components/types/image";

// Interfaces and Types
type StateType = {
  search: string;
  setSearch: (s: string) => void;
  images: ImageType[];
  setImages: (i: ImageType[]) => void;
  viewing: string;
  setViewing: (s: string) => void;
  liked: ImageType[];
  setLiked: (i: ImageType[]) => void;
  showLiked: boolean;
  setShowLiked: (b: boolean) => void;
};
interface StateContextProviderProps {
  children: ReactNode;
}

// Initial state for context
const intitialState: StateType = {
  search: "",
  setSearch: () => {},
  images: [],
  setImages: () => {},
  viewing: "",
  setViewing: () => {},
  liked: [],
  setLiked: () => {},
  showLiked: false,
  setShowLiked: () => {},
};

export const StateContext = createContext<StateType>(intitialState);

export default function StateContextProvider({
  children,
}: StateContextProviderProps) {
  const [search, setSearch] = useState(""); // Search term actively typed out in search bar
  const [images, setImages] = useState<ImageType[]>([]); // Images to displayed
  const [viewing, setViewing] = useState(""); // Search term used for getting current images
  const [liked, setLiked] = useState<ImageType[]>([]); // Images liked by user
  const [showLiked, setShowLiked] = useState<boolean>(false); // Whether or not to display liked images

  return (
    <StateContext.Provider
      value={{
        search,
        setSearch,
        images,
        setImages,
        viewing,
        setViewing,
        liked,
        setLiked,
        showLiked,
        setShowLiked,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
