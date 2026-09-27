// Petite étiquette de technologie.
export default function Tag({ children }) {
  return (
    <span className="inline-flex rounded-full border border-line px-3 py-1 text-xs text-paper/80 transition-colors duration-200 hover:border-gold/60 hover:text-paper">
      {children}
    </span>
  )
}
