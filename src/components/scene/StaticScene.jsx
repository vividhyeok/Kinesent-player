function StaticScene({ scene }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-950 p-4 sm:p-6">
      <img
        alt={scene.title}
        className="max-h-full max-w-full rounded-[1.5rem] object-contain shadow-[0_24px_80px_rgba(15,23,42,0.55)]"
        src={scene.assetUrl}
      />
    </div>
  )
}

export default StaticScene
