
const Views = ({views}:{views:number}) => {
  return (
      <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="inline-block"
            >
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{Intl.NumberFormat().format(views || 0)}</span>
          </div>
  )
}

export default Views
