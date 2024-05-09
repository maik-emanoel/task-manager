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

export default async function Header() {
  const user = await getUser();

  return (
    <header className="flex justify-between items-center gap-6">
      <div>
        <h1 className="text-xl sm:text-2xl">
          Welcome back, <span className="font-bold whitespace-nowrap">{user?.username}!</span>
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Here&apos;s a list of your tasks for this month!
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
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New team</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
