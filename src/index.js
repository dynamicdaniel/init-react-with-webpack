import App from './App'

// 配置 HMR 所需要的代码
if (module.hot) {
  module.hot.accept(err => {
    if (err) {
      console.error('Cannot apply HMR update.', err)
    }
  })
}