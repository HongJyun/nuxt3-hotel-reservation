<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, Autoplay, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { IRoom, IApiRoomsResponse } from '@/types/index'

const { swiperInstance, active, changeSlide, stopAutoplay, startAutoplay, onSlideChange } = useSwiper()
const { data } = await useFetch<IApiRoomsResponse>('/api/rooms')

const rooms = ref(data.value?.items || [])
const activeRoom = computed(() => rooms.value[active.value])

const modules = [EffectFade, Autoplay, Navigation]

const handleChange = (room: IRoom) => {
  stopAutoplay()
  const index = rooms.value.findIndex((_room) => _room.id === room.id)
  changeSlide(index)
}
</script>

<template>
  <div class="min-w-screen relative min-h-screen overflow-x-hidden">
    <swiper
      :space-between="30"
      :effect="'fade'"
      :autoplay="{
        delay: 5000
      }"
      :modules="modules"
      class="backdrop !fixed !-z-10 h-full w-full object-cover object-center md:!absolute"
      @swiper="swiperInstance = $event"
      @slide-change="onSlideChange"
    >
      <swiper-slide v-for="room of rooms" :key="room.id">
        <img class="h-full w-full object-cover" :src="room.imageUrl" />
      </swiper-slide>
    </swiper>
    <img
      class="relative top-3 left-3 h-16 w-16 md:top-12 md:left-[54px]"
      src="@/assets/images/index_icon/logo_white.svg"
      alt="logo_white"
    />
    <aside
      class="aside stripe-decor absolute top-24 right-0 min-w-[200px] bg-white md:top-12 md:min-w-[300px]"
      @mouseleave="() => startAutoplay()"
    >
      <ul class="pb-11 pt-[18px]">
        <nuxt-link v-for="(room, i) of rooms" :key="room.id" :to="`/room/${room.id}`">
          <li
            :class="{ 'bg-[#484848] text-white': i === active }"
            class="cursor-pointer py-[18px] px-[34px] text-sm leading-5 tracking-[1.5px] transition-colors duration-500"
            @mouseenter="() => handleChange(room)"
          >
            {{ room.name }}
          </li>
        </nuxt-link>
      </ul>
    </aside>
    <div class="absolute bottom-[72px] left-[34px] md:left-[54px]">
      <div class="room-number stripe-decor text-[66px] leading-[98px] text-white">
        <span class="relative z-10"> {{ String(active + 1).padStart(2, '0') }} </span>
      </div>
      <div class="text-[24px] leading-[36px] tracking-[2.5px] text-white">{{ activeRoom.name }}</div>
    </div>
    <footer
      class="absolute left-0 bottom-0 min-w-[300px] translate-y-full transform px-[34px] pb-8 md:right-0 md:left-auto md:bottom-[74px] md:translate-y-0 [@media(max-height:800px)]:md:translate-y-1/3"
    >
      <div class="mb-[49px] flex">
        <a href="#" class="mr-3">
          <img width="21" height="20" src="@/assets/images/index_icon/facebook-square-brands.svg" alt="fb" />
        </a>
        <a href="#">
          <img width="21" height="20" src="@/assets/images/index_icon/instagram-brands.svg" alt="ig" />
        </a>
      </div>
      <ul class="text-[14px] leading-5 text-white">
        <li class="mb-4 flex items-center last:mb-0">
          <img
            width="19"
            class="mr-[11px]"
            src="@/assets/images/index_icon/phone-alt-solid.svg"
            alt="phone-alt-solid"
          />
          <address class="not-italic">02-17264937</address>
        </li>
        <li class="mb-4 flex items-center last:mb-0">
          <img
            width="19"
            class="mr-[11px]"
            src="@/assets/images/index_icon/envelope-solid.svg"
            alt="envelope-solid.svg"
          />
          <address class="not-italic">whitespace@whitespace.com.tw</address>
        </li>
        <li class="mb-4 flex items-center last:mb-0">
          <img width="19" class="mr-[11px]" src="@/assets/images/index_icon/home-solid.svg" alt="home-solid.svg" />
          <address class="not-italic">台北市羅斯福路十段30號</address>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.aside.stripe-decor::after {
  height: 20px;
  width: 90%;
}
.room-number {
  position: relative;
  z-index: 2;
  &.stripe-decor::after {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 0;
    transform: translateY(-50%);
    height: 20px;
    width: 86px;
  }
}

.backdrop::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
  pointer-events: none;
}
</style>
