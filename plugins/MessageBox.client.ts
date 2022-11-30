import { createApp } from 'vue'
import MessageBoxCpn from '~~/components/MessageBox.vue'

interface IMessageBox {
  title: string
  message: string | HTMLElement
  confirmBtnText: string
}

const frg = document.createElement('div')
document.body.appendChild(frg)
export function MessageBox(options: IMessageBox) {
  return new Promise((resolve, reject) => {
    const app = createApp(MessageBoxCpn, {
      ...options,
      onDestroy: () => {
        app.unmount()
      },
      onConfirm: (value: any) => {
        resolve(value)
      },
      onCancel: () => {
        reject(new Error('test'))
      }
    })
    app.mount(frg)
  })
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      msgBox: MessageBox
    }
  }
})
