
import {DanteEditor, Dante} from './components/init.js'

if (window) {
  window.Dante = Dante	
  window.DanteEditor = DanteEditor
}

export {
  Dante, 
  DanteEditor
}
