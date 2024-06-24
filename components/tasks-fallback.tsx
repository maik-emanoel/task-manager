import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

export default function TasksFallback() {
  return (
    <div className="pt-40 w-full flex items-center justify-center">
      <CircleNotch size={28} className="animate-spin text-muted-foreground" />
    </div>
  )
}
