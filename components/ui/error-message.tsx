interface MessageProps {
  message: string;
}

export default function ErrorMessage({ message }: MessageProps) {
  return <p className="text-xs text-red-500 mt-1">{message}</p>;
}
