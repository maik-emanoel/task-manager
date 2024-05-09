import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import { getUser } from "@/app/utils/get-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LogoutButton from "./logout-button";
import ThemeSubDropdown from "./theme-subdropdown";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="flex justify-between items-center gap-6">
      <div>
        <h1 className="text-xl sm:text-2xl">
          Welcome back, <span className="font-bold">{user?.username}!</span>
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Here&apos;s a list of your tasks!
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserCircle size={36} weight="thin" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>
            <div className="flex flex-colflex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.username}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <ThemeSubDropdown />
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
