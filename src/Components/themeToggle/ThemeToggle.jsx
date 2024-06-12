
import React, { useContext, useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { ThemeContext } from '../../Context/ThemeContext';

const ThemeToggle = () => {
    const {theme,toggle}=useContext(ThemeContext);
    const isDarkMode = theme === 'dark';
  return (
    <DarkModeSwitch
      onClick={toggle}
      checked={isDarkMode}
      size={70}
      moonColor="white"
      sunColor='orange'
    />
  )
}

export default ThemeToggle