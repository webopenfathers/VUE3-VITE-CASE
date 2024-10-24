import { lazy, drag, slideIn } from './registerDirective'

const directives = {
  lazy,
  drag,
  slideIn,
}

// 批量注册自定义全局指令
export function setDirective(app) {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })
}
