import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import CustomButton from "../ui/reusable/custom-button";
import { useSearchContext } from "@/app/contexts/search-context";

const Sort = ({ options }: { options: string[] }) => {
  const { sort, setSort, triggerSearch } = useSearchContext();

  // Handle sort changes
  const handleSortChange = (value: string) => {
    setSort(value);
    triggerSearch();
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <span className="space-x-2 text-sm mr-2">Sort by</span>
            <CustomButton
              variant="outline"
              size="sm"
              className="h-8 gap-1 rounded-sm capitalize"
            >
              {sort}
              <ChevronDown className="h-4 w-4" />
            </CustomButton>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
            {options.map((option) => (
              <DropdownMenuRadioItem key={option} value={option}>
                {option}
                {/* {sort === option && (
                  <Check className="ml-auto h-4 w-4" />
                )} */}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sort;
