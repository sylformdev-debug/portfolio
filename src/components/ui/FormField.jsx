// Champ de formulaire accessible : libellé, message d'erreur relié au champ, compteur optionnel.
export default function FormField({ id, label, error, multiline = false, maxLength, value, showCounter = false, ...props }) {
  const errorId = `${id}-erreur`
  const Control = multiline ? 'textarea' : 'input'

  return (
    <div className="group/field">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-paper transition-colors duration-200 group-focus-within/field:text-gold"
        >
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
        aria-describedby={errorId}
        className={`mt-2 w-full rounded-xl border bg-surface/70 px-4 py-3 text-paper placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 focus:border-gold focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--gold)_18%,transparent)] focus:outline-none ${
          multiline ? 'min-h-40 resize-y' : ''
        } ${error ? 'border-red-500/70' : 'border-line hover:border-paper/30'}`}
        {...props}
      />
      {/* Place réservée au message d'erreur : le formulaire ne bouge pas quand une erreur apparaît. */}
      <p id={errorId} className="mt-1.5 min-h-5 text-sm leading-5 text-red-700 dark:text-red-300">
        {error}
      </p>
    </div>
  )
}
