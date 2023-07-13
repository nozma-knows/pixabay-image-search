import Searchbar from "@/components/ui/searchbar";
import MasonryGrid from "@/components/ui/masonry-grid";

const title = "Pixababy Image Search";

export default function Home() {
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <Searchbar />
        <MasonryGrid />
      </div>
    </div>
  );
}
