import { Skeleton } from "./skeleton"

const CardSkeleton = () => {
  return (
    <div className="group border-0 py-0 shadow-md">
      {/* Header skeleton */}
      <div className="py-3 bg-gray-300 rounded-t-lg">
        <div className="flex items-center gap-2 px-4">
          <Skeleton className="w-8 h-8 bg-white/20 rounded-full" />
          <Skeleton className="h-5 w-36 bg-white/30 rounded" />
        </div>
        <Skeleton className="h-4 w-28 bg-white/20 rounded mt-1 ml-4" />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col items-center justify-center p-6 bg-white">
        <Skeleton className="h-24 w-24 rounded-full bg-gray-100" />
        <Skeleton className="h-4 w-32 bg-slate-300 rounded mt-4" />
        <Skeleton className="h-3 w-24 bg-slate-200 rounded mt-2" />
      </div>
    </div>
  )
}

export default CardSkeleton;
