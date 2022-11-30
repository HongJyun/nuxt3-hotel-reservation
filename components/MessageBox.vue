<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { onConfirm, message } = defineProps({
  title: {
    type: String,
    default: '提示'
  },
  message: {
    type: String,
    default: ''
  },
  confirmBtnText: {
    type: String,
    default: 'OK'
  },
  onDestroy: {
    type: Function,
    default: () => {}
  },
  onConfirm: {
    type: Function,
    default: () => {}
  },
  onCancel: {
    type: Function,
    default: () => {}
  }
})

const visible = ref(false)
const setVisible = (vis: boolean) => {
  visible.value = vis
}

const confirmBtnClicked = () => {
  setVisible(false)
  onConfirm()
}

onMounted(() => {
  setVisible(true)
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <BaseModal :visible="visible" @on-destroy="() => onDestroy()" @close="visible = false">
    <div
      class="content absolute top-[100px] left-1/2 w-full -translate-x-1/2 transform bg-white px-10 py-7 md:w-[423px]"
    >
      <div class="text-2xl font-medium">{{ title }}</div>
      <div class="my-2 text-sm">///</div>
      <div v-html="message"></div>
      <div class="flex justify-end">
        <button class="bg-[#484848] px-5 py-[10px] text-sm tracking-[1.5px] text-white" @click="confirmBtnClicked">
          {{ confirmBtnText }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>
