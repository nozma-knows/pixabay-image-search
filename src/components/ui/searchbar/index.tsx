"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { BiSolidHeart } from "react-icons/bi";
import { StateContext } from "@/context/state.context";
import Button from "@/components/ui/button";
import { motion } from "framer-motion";

import "../button/index.css";

function ImageSearchForm(): JSX.Element {
  // Grab state context
  const { search, setSearch, handleSearch } = useContext(StateContext);
  const disabled = !search.length;
  return (
    <form
      onSubmit={(event) => handleSearch(event)}
      className="flex w-full gap-4"
    >
      <input
        id="search-field"
        className="outline-none w-full h-full bg-white/20 border-2 border-transparent rounded-lg p-5"
        type="text"
        name="search"
        placeholder="Search for images"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <motion.input
        type="submit"
        // className="flex w-fit justify-center items-center text-center font-bold px-4 py-2 bg-white/20 rounded-lg cursor-pointer"
        className={`${disabled ? "disabled-button" : "button"}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={disabled}
      />
    </form>
  );
}

function ViewLikedButton(): JSX.Element {
  const { liked, showLiked, setShowLiked } = useContext(StateContext);

  useEffect(() => {
    if (!liked.length) {
      setShowLiked(false);
    }
  }, [liked, setShowLiked]);

  return (
    <Button
      tooltip={{
        title: liked.length
          ? "View your favorite images"
          : "You haven't marked any images as favorites yet",
        placement: "top",
      }}
      onClick={() => setShowLiked(!showLiked)}
      disabled={!liked.length}
    >
      <BiSolidHeart className="w-8 h-8" />
    </Button>
  );
}

export default function Searchbar(): JSX.Element {
  return (
    <div className="flex w-full gap-4">
      <ImageSearchForm />
      <ViewLikedButton />
    </div>
  );
}
