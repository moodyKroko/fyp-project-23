import { extendTheme } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const colors = {
  red_pigment: '#FB2327',
  alice_blue: '#E8F1F2',
  delft_blue: '#223359',
  rich_black: '#11151C',
  black: '#11151C',
  white: '#E8F1F2'
}

const styles = {
  global: (props: StyleFunctionProps) => ({
    p: {
      color: mode('#223359', '#E8F1F2')(props)
    },
    body: {
      fontWeight: 'medium',
      letterSpacing: 0.5
    }
  })
}

const fonts = {
  body: 'Roboto, Open sans',
  heading: 'Montserrat, Roboto'
}

const theme = extendTheme({ config, styles, colors, fonts })

export default theme
