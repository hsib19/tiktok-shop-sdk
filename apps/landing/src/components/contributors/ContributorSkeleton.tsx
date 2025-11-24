export function ContributorSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
      <div className="flex flex-col gap-1">
        <div className="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800"></div>
      </div>
    </div>
  );
}
