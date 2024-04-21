import {
  ArrowRight,
  Circle,
  Timer,
  XCircle,
  CheckCircle,
  Question,
  ArrowUp,
  ArrowDown,
  Minus,
} from "@phosphor-icons/react/dist/ssr";

export function StatusIcon({ status }: { status: string }) {
  let Icon: any = Circle;

  switch (status) {
    case "todo":
      Icon = Circle;
      break;
    case "inProgress":
      Icon = Timer;
      break;
    case "canceled":
      Icon = XCircle;
      break;
    case "done":
      Icon = CheckCircle;
      break;
    case "backlog":
      Icon = Question;
      break;
    default:
      break;
  }

  return <Icon className="mr-2 size-4 text-muted-foreground" />;
}

export function PriorityIcon({ priority }: { priority: string }) {
  let Icon: any = Minus;

  switch (priority) {
    case "high":
      Icon = ArrowUp;
      break;
    case "medium":
      Icon = ArrowRight;
      break;
    case "low":
      Icon = ArrowDown;
      break;
    default:
      break;
  }

  return <Icon className="mr-2 size-4 text-muted-foreground" />;
}
