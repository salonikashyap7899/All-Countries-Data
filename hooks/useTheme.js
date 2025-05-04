import { useContext } from 'react'
import { ThemeConext } from '../context/ThemeConext'
export const useTheme = () => useContext(ThemeConext)