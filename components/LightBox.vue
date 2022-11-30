<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, Autoplay, Navigation } from 'swiper'
import useSwiper from '@/composables/useSwiper'

import 'swiper/css'
import 'swiper/css/effect-fade'

const props = defineProps({
  caption: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  },
  images: {
    type: Array<string>,
    default: () => []
  },
  startIndex: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['close'])

const { swiperInstance, active, changeSlide, stopAutoplay, startAutoplay, onSlideChange } = useSwiper()
const modules = [EffectFade, Autoplay, Navigation]

active.value = +props.startIndex
const handleChange = (val: number) => {
  stopAutoplay()
  const newIndex = (active.value + val + props.images.length) % props.images.length
  changeSlide(newIndex)
  startAutoplay()
}
</script>

<template>
  <BaseModal :visible="visible">
    <div class="flex h-full w-full items-center justify-between px-5" @click.self="emit('close')">
      <i class="icon-left-open-big cursor-pointer text-4xl text-white" @click="handleChange(-1)"></i>
      <div class="backdrop flex h-[80vh] w-[80vw] flex-col items-center justify-center">
        <div class="h-full w-full">
          <swiper
            :space-between="30"
            :effect="'fade'"
            :autoplay="{
              delay: 5000
            }"
            :modules="modules"
            class="h-full w-full"
            @swiper="swiperInstance = $event"
            @slide-change="onSlideChange"
          >
            <swiper-slide v-for="image of images" :key="image" class="flex items-center justify-center">
              <img class="h-full w-full object-cover object-center" :src="image" />
            </swiper-slide>
          </swiper>
        </div>
        <div class="mt-5 flex w-full justify-between font-bold text-white">
          <span>{{ caption }}</span>
          <span>{{ active + 1 }} / {{ images.length }}</span>
        </div>
      </div>
      <i class="icon-right-open-big cursor-pointer text-4xl text-white" @click="handleChange(1)"></i></div
  ></BaseModal>
</template>

<style lang="scss" scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: all 0.2s ease-in-out;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
