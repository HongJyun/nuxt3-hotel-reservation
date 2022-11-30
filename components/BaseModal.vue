<script setup lang="ts">
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['close', 'on-destroy'])
</script>

<template>
  <Teleport to="body">
    <Transition class="modal" name="modal" @after-leave="emit('on-destroy')">
      <div v-if="visible" class="overlay fixed inset-0 z-50 bg-black bg-opacity-50" @click.self="emit('close')">
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease-in-out;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active :slotted(.content),
.modal-leave-active :slotted(.content) {
  transition: all 0.4s ease;
}

.modal-enter-to :slotted(.content),
.modal-leave-from :slotted(.content) {
  transform: scale(1) translateX(-50%);
  transform-origin: center left;
}

.modal-enter-from :slotted(.content),
.modal-leave-to :slotted(.content) {
  transform: scale(0.8) translateX(-50%);
  transform-origin: center left;
}
</style>
