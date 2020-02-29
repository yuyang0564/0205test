import Vue from 'vue'
import validator from './validator'
import DropDown from './dropdown'

const directive = {
  validator,
  DropDown
}

for(let [key , value] of Object.entries(directive)) {
  Vue.directive(key, value)
}
