import {
    MoonStar,
    Sun,
  } from "lucide-react"
   
  import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
  } from "@/components/ui/dropdown-menu"

  export const ThemeOptions = () => {
    const setTheme = (theme: string) => {
      const root = window.document.documentElement;
      root.classList.remove("dark");
      root.classList.remove("light");
      root.classList.add(theme);
    };
  
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <MoonStar className="mr-2 h-4 w-4" />
          <span>Appearance</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <MoonStar className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    );
  };