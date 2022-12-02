<script setup lang="ts">
import { useRoute } from 'vue-router'
import { IApiRoomDetailResponse } from '@/types/index'
const route = useRoute()

const { data, refresh } = await useFetch<IApiRoomDetailResponse>('/api/room', {
  query: {
    id: route.params.id
  }
})
const room = toRef(data.value as IApiRoomDetailResponse, 'room') || {}

useHead({
  title: computed(() => room.value.name)
})

const booking = computed(() => {
  return (data.value as IApiRoomDetailResponse).booking || []
})
const amenities = computed(() => {
  interface amenity {
    label: string
    name: string
    iconUrl: string
    isAvailable?: boolean
  }
  const amenities: amenity[] = [
    {
      label: 'Wi-Fi',
      name: 'Wi-Fi',
      iconUrl: new URL('/assets/images/info_icon/wifi.svg', import.meta.url).toString()
    },
    {
      label: '電話',
      name: 'Television',
      iconUrl: new URL('/assets/images/info_icon/phone.svg', import.meta.url).toString()
    },
    {
      label: '漂亮的視野',
      name: 'Great-View',
      iconUrl: new URL('/assets/images/info_icon/mountain-range.svg', import.meta.url).toString()
    },
    {
      label: '早餐',
      name: 'Breakfast',
      iconUrl: new URL('/assets/images/info_icon/breakfast.svg', import.meta.url).toString()
    },
    {
      label: '空調',
      name: 'Air-Conditioner',
      iconUrl: new URL('/assets/images/info_icon/breeze.svg', import.meta.url).toString()
    },
    {
      label: '禁止吸菸',
      name: 'Smoke-Free',
      iconUrl: new URL('/assets/images/info_icon/no-smoke-symbol.svg', import.meta.url).toString()
    },
    {
      label: 'Mini Bar',
      name: 'Mini-Bar',
      iconUrl: new URL('/assets/images/info_icon/bar.svg', import.meta.url).toString()
    },
    {
      label: '適合兒童',
      name: 'Child-Friendly',
      iconUrl: new URL('/assets/images/info_icon/crawling-baby-silhouette.svg', import.meta.url).toString()
    },
    {
      label: 'Room Service',
      name: 'Room-Service',
      iconUrl: new URL('/assets/images/info_icon/room-service.svg', import.meta.url).toString()
    },
    {
      label: '寵物攜帶',
      name: 'Pet-Friendly',
      iconUrl: new URL('/assets/images/info_icon/dog.svg', import.meta.url).toString()
    }
  ]
  amenities.forEach((item) => {
    item.isAvailable = room.value.amenities[item.name]
  })
  return amenities
})

const selected = ref([])
const isLightBoxVisible = ref(false)
</script>

<template>
  <article>
    <div class="hero relative h-[400px] md:h-[596px]">
      <img class="absolute top-8 left-12" src="@/assets/images/index_icon/logo_white.svg" alt="logo" />
      <div class="grid h-full grid-cols-[60%,40%] grid-rows-[70%,30%] md:grid-cols-[70%,30%] md:grid-rows-2">
        <img
          v-for="i in 3"
          :key="i"
          class="h-full w-full cursor-pointer object-cover first:col-span-2 md:first:col-span-1 md:first:row-span-2"
          :src="room.imageUrl[i - 1]"
          alt="room-preview"
          @click="isLightBoxVisible = true"
        />
      </div>
      <LightBox
        :caption="room.name"
        :visible="isLightBoxVisible"
        :images="room.imageUrl"
        @close="isLightBoxVisible = false"
      ></LightBox>
    </div>
    <main class="mt-12 mb-16 grid px-[5.2%] md:grid-cols-[1fr,13%,31.9%] md:gap-[3.1%]">
      <section>
        <h1 class="mb-[2.2%] text-4xl font-semibold">
          {{ room.name }}
        </h1>
        <ul class="text-sm leading-[31px] tracking-[1.5px]">
          <li>房客人數限制： {{ room.descriptionShort.GuestMin }}~{{ room.descriptionShort.GuestMax }} 人</li>
          <li>床型：{{ room.descriptionShort.Bed }}</li>
          <li>衛浴數量： {{ room.descriptionShort['Private-Bath'] }} 間</li>
          <li>房間大小： {{ room.descriptionShort.Footage }} 平方公尺</li>
        </ul>
        <p class="mt-6 text-xs leading-5">
          {{ room.description }}
        </p>
        <div class="my-6">///</div>
        <div class="grid grid-cols-2">
          <div>
            <p class="text-sm">Check In</p>
            <p class="text-[21px] leading-[31px]">
              {{ room.checkInAndOut.checkInEarly }} — {{ room.checkInAndOut.checkInLate }}
            </p>
          </div>
          <div>
            <p class="text-sm">Check Out</p>
            <p class="text-[21px] leading-[31px]">{{ room.checkInAndOut.checkOut }}</p>
          </div>
        </div>
        <div class="mt-10 grid grid-cols-2 gap-8 bg-[#f0f0f0] p-8 md:grid-cols-3">
          <figure
            v-for="amenity in amenities"
            :key="amenity.label"
            :class="{ 'opacity-30': !amenity.isAvailable }"
            class="flex items-center"
          >
            <client-only>
              <img width="24" class="mr-4" :src="amenity.iconUrl" alt="wifi" />
            </client-only>
            <figcaption class="text-xs">{{ amenity.label }}</figcaption>
          </figure>
        </div>
      </section>
      <div class="my-6 text-right leading-7 tracking-[1.3px] md:my-0">
        <p class="text-[30px] font-bold leading-10">NT.{{ room.normalDayPrice }}</p>
        <p class="text-[14px] text-[#6D7278]">平日(一~四)</p>
        <p class="mt-2 text-[16px] font-bold">NT.{{ room.holidayPrice }}</p>
        <p class="text-[14px] text-[#6D7278]">假日(五~日)</p>
      </div>
      <div>
        <TheCalendar v-model:selected="selected" :booking="booking" />
        <RoomReservationDialog
          v-model:selected="selected"
          class="flex justify-center"
          :room="room"
          @booked="refresh"
        ></RoomReservationDialog>
      </div>
    </main>
  </article>
</template>
