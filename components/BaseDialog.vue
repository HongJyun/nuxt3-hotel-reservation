<script setup lang="ts">
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['close', 'confirm'])
const close = () => {
  emit('close')
}
const confirm = () => {
  emit('confirm')
}
</script>

<template>
  <BaseModal :visible="visible" @close="close">
    <div
      class="content absolute top-[100px] left-1/2 w-full -translate-x-1/2 transform bg-white px-10 py-7 md:w-[423px]"
    >
      <slot name="header">
        <div class="text-2xl font-medium">提示</div>
      </slot>
      <div class="my-2 text-sm">///</div>
      <slot></slot>
      <slot name="footer">
        <div class="flex justify-end">
          <button class="bg-[#484848] px-5 py-[10px] text-sm tracking-[1.5px] text-white" @click="confirm">確定</button>
        </div>
      </slot>
    </div>
  </BaseModal>
</template>

<style></style>
