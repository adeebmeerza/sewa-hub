import ItemCard, { ItemProps } from "./ItemCard";

const SearchResult = ({ items }: { items: ItemProps[] }) => {
  // const [currentPage, setCurrentPage] = useState(1)
  // const [postsPerPage, setPostsPerPage] = useState(20)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4 my-4">
      {items.map((result) => (
        <ItemCard key={result.id} {...result} />
      ))}
    </div>
  );
};

export default SearchResult;
