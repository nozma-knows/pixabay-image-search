"use client";

import {
  createContext,
  useState,
  ReactNode,
  FormEvent,
  MouseEvent,
} from "react";
import { ImageType } from "@/components/types/image";

// Interfaces and Types
type StateType = {
  search: string;
  setSearch: (s: string) => void;
  images: ImageType[];
  setImages: (i: ImageType[]) => void;
  hits: number;
  setHits: (n: number) => void;
  viewing: string;
  setViewing: (s: string) => void;
  liked: ImageType[];
  setLiked: (i: ImageType[]) => void;
  showLiked: boolean;
  setShowLiked: (b: boolean) => void;
  handleSearch: (
    event:
      | FormEvent<HTMLFormElement>
      | KeyboardEvent
      | MouseEvent<HTMLInputElement, MouseEvent>
  ) => Promise<ImageType[]>;
  handleGrabMore: () => Promise<ImageType[]>;
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
  hits: 0,
  setHits: () => {},
  viewing: "",
  setViewing: () => {},
  liked: [],
  setLiked: () => {},
  showLiked: false,
  setShowLiked: () => {},
  handleSearch: () => Promise.resolve([]),
  handleGrabMore: () => Promise.resolve([]),
};

export const StateContext = createContext<StateType>(intitialState);

export default function StateContextProvider({
  children,
}: StateContextProviderProps) {
  const [search, setSearch] = useState(""); // Search term actively typed out in search bar
  const [images, setImages] = useState<ImageType[]>([]); // Images to displayed
  const [hits, setHits] = useState<number>(0); // Total number of images returned from pixabay
  const [viewing, setViewing] = useState(""); // Search term used for getting current images
  const [liked, setLiked] = useState<ImageType[]>([]); // Images liked by user
  const [showLiked, setShowLiked] = useState<boolean>(false); // Whether or not to display liked images

  async function handleSearch(
    event:
      | FormEvent<HTMLFormElement>
      | KeyboardEvent
      | MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    event.preventDefault();
    setImages([]);
    const masonryGrid = document.getElementById("masonry-grid");
    masonryGrid?.scrollTo(0, 0);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PIXABAY_BASE_API}/?key=${
        process.env.NEXT_PUBLIC_PIXABAY_API_KEY
      }&q=${encodeURIComponent(search)}&per_page=100`
    );
    const data = await res.json();
    console.log("data: ", data);
    setImages(data.hits);
    setHits(data.totalHits);
    setViewing(search);
    setSearch("");
    return data;
  }

  async function handleGrabMore() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PIXABAY_BASE_API}/?key=${
        process.env.NEXT_PUBLIC_PIXABAY_API_KEY
      }&q=${encodeURIComponent(viewing)}&page=${
        images.length / 100 + 1
      }&per_page=100`
    );
    const data = await res.json();
    setImages([...images, ...data.hits]);
    return data;
  }

  return (
    <StateContext.Provider
      value={{
        search,
        setSearch,
        images,
        setImages,
        hits,
        setHits,
        viewing,
        setViewing,
        liked,
        setLiked,
        showLiked,
        setShowLiked,
        handleSearch,
        handleGrabMore,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
