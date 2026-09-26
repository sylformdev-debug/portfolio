// Champ de formulaire accessible : libellé, message d'erreur relié au champ, compteur optionnel.
export default function FormField({ id, label, error, multiline = false, maxLength, value, showCounter = false, ...props }) {
  const errorId = `${id}-erreur`
  const Control = multiline ? 'textarea' : 'input'

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold text-paper">
          {label}
        </label>
        {showCounter && (
          <span className="text-xs tabular-nums text-muted" aria-hidden="true">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <Control
        id={id}
        name={id}
        value={value}
        maxLength={maxLength}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 w-full rounded-md border bg-surface px-4 py-3 text-paper placeholder:text-paper/35 transition-colors duration-200 focus:border-gold focus:outline-none ${
          multiline ? 'min-h-40 resize-y' : ''
        } ${error ? 'border-red-400/80' : 'border-line hover:border-paper/30'}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}
