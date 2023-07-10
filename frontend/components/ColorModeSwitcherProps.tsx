import * as React from 'react'
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps
} from '@chakra-ui/react'
import { IoSunnyOutline, IoMoon } from 'react-icons/io5'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = props => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(IoMoon, IoSunnyOutline)
  const toggleBtnColor = useColorModeValue('purple', 'orange')

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="solid"
      colorScheme={toggleBtnColor}
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      shadow={'xl'}
      {...props}
    />
  )
}
