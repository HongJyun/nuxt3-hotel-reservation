import { Swiper as ISwiper } from 'swiper/types'

export default function () {
  const swiperInstance = ref<ISwiper | null>(null)
  const active = ref(0)

  const changeSlide = (newIndex: number) => {
    swiperInstance.value!.slideTo(newIndex)
  }

  const stopAutoplay = () => {
    swiperInstance.value!.autoplay.stop()
  }

  const startAutoplay = () => {
    swiperInstance.value!.autoplay.start()
  }

  const onSlideChange = (e: ISwiper) => {
    active.value = e.activeIndex
  }

  return {
    swiperInstance,
    active,
    changeSlide,
    stopAutoplay,
    startAutoplay,
    onSlideChange
  }
}
