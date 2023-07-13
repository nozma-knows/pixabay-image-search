"use client";

import { FormEvent, ChangeEvent, useContext } from "react";
import { BiSolidHeart } from "react-icons/bi";

import { StateContext } from "@/context/state.context";
import Button from "@/components/ui/button";

interface SearchbarProps {}

export default function Searchbar() {
  // Grab state context
  const { search, setSearch, liked } = useContext(StateContext);

  async function handleSearch(e: FormEvent<HTMLFormElement> | KeyboardEvent) {
    e.preventDefault();
    console.log("Handle Search!");
  }

  return (
    <div className="flex w-full gap-4">
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
        <input
          type="submit"
          className="flex w-fit justify-center items-center text-center font-bold px-4 py-2 bg-white/20 rounded-lg"
        />
      </form>
      <Button
        tooltip={{
          title: liked.length
            ? "View your favorite images"
            : "You haven't marked any images as favorites yet",
          placement: "top",
        }}
        onClick={() => console.log("Set Show Liked")}
        disabled={!liked.length}
      >
        <BiSolidHeart className="w-8 h-8" />
      </Button>
    </div>
  );
}
