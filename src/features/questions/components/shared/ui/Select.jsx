import { clsx } from "clsx";

export default function Select({ className, ...props }) {
  return (
    <select
      {...props}
      className={clsx(
        "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400",
        className
      )}
    />
  );
}
