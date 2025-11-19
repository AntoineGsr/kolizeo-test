import React, { forwardRef } from 'react'

export interface ButtonShinyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  onClick?: () => void
}

const ButtonShiny = forwardRef<HTMLButtonElement, ButtonShinyProps>(
  ({ label, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full h-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer relative group overflow-hidden`}
        onClick={onClick}
        {...props}
      >
        <div className="relative z-10 flex items-center justify-center font-medium text-sm">
          <span className="flex text-center">{label}</span>
        </div>
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-kolizeo-orange/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700`}
        ></div>
      </button>
    )
  }
)

ButtonShiny.displayName = 'ButtonShiny'

export default ButtonShiny
