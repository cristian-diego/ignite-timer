import { createContext, useEffect, useState } from 'react'

interface CultureContextType {
  culture: 'pt' | 'en'
  changeCulture: (culture: 'pt' | 'en') => void
}

export const CultureContext = createContext({} as CultureContextType)

interface CultureContextProviderProps {
  children: React.ReactNode
}

export function CultureContextProvider({
  children,
}: CultureContextProviderProps) {
  const [culture, setCulture] = useState<'pt' | 'en'>('en')

  function changeCulture(culture: 'pt' | 'en') {
    setCulture(culture)
  }

  return (
    <CultureContext.Provider value={{ culture, changeCulture }}>
      {children}
    </CultureContext.Provider>
  )
}
