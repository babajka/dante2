
import {DanteEditor, Dante} from './components/init.js'

if (typeof window !== 'undefined') {
  window.Dante = Dante	
  window.DanteEditor = DanteEditor
}

export {
  Dante, 
  DanteEditor
}
