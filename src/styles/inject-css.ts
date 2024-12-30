// src/styles/inject-css.ts
import cssText from './global.css'

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.setAttribute('id', 'plumifly-styles')
  style.textContent = cssText
  if (!document.getElementById('plumifly-styles')) {
    document.head.appendChild(style)
  }
}