"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";

export default function ThemeSubDropdown() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Themes</DropdownMenuSubTrigger>

      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={theme}>
          <DropdownMenuRadioItem
            value="light"
            onClick={() => setTheme("light")}
          >
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="system"
            onClick={() => setTheme("system")}
          >
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
