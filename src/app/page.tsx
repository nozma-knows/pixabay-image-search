import Searchbar from "@/components/ui/searchbar";
import MasonryGrid from "@/components/ui/masonry-grid";

const title = "Pixabay Image Search";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="flex p-8">{title}</h1>
      <div className="flex flex-col max-w-4xl w-full h-full overflow-hidden gap-2 p-4">
        <Searchbar />
        <MasonryGrid />
      </div>
    </div>
  );
}
