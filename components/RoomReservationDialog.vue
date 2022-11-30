<script setup lang="ts">
const { $msgBox } = useNuxtApp()
const props = defineProps({
  selected: {
    type: Array<number>,
    default: () => []
  },
  room: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['update:selected'])
const selected = toRef(props, 'selected')

const visible = ref(false)
const formatYearToDayByKebab = (timestamp: number) => {
  if (!timestamp) {
    return ''
  } else {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}

const formateDateToTimeZero = (dateString: string) => {
  const date = new Date(dateString)
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}
const cancel = () => {
  visible.value = false
}

interface IApiBookResponse {
  success: boolean
  message?: string
}
const confirm = async () => {
  const { data, error } = await useFetch<IApiBookResponse>('/api/book', {
    method: 'POST',
    body: { roomId: props.room.id }
  })
  if (!data.value?.success || error.value) {
    $msgBox({ title: '預約失敗', message: data.value?.message as string, confirmBtnText: '返回' })
  } else {
    const img = new URL('/assets/images/info_icon/tick-inside-circle.svg', import.meta.url)
    $msgBox({
      title: '預約成功',
      message: `<img class="mx-auto mb-6 w-[65px] h-[65px]" src=${img}>`,
      confirmBtnText: '回頁面'
    })
  }
  visible.value = false
}

const change = (index: number, value: string) => {
  const ary = selected.value
  ary[index] = +formateDateToTimeZero(value)
  emit('update:selected', ary)
}

const calDays = computed(() => {
  if (!selected.value[1] || !selected.value[0]) {
    return {
      holiday: 0,
      normal: 0
    }
  }

  const diff = selected.value[1] - selected.value[0] || 0
  const days = diff / (1000 * 60 * 60 * 24) + 1
  const dayAry = new Array(days).fill(0).map((_, i) => {
    return selected.value[0] + i * (1000 * 60 * 60 * 24)
  })
  return dayAry.reduce(
    (prev, cur) => {
      const day = new Date(cur)
      const isHoliday = day.getDay() === 0 || day.getDay() === 5 || day.getDay() === 6
      if (isHoliday) {
        prev.holiday += 1
      } else {
        prev.normal += 1
      }
      return prev
    },
    {
      holiday: 0,
      normal: 0
    }
  )
})
const price = computed(() => {
  const holidayPrice = props.room.holidayPrice * calDays.value.holiday || 0
  const normalPrice = props.room.normalDayPrice * calDays.value.normal || 0
  return holidayPrice + normalPrice || 0
})
</script>

<template>
  <div>
    <button class="book-btn stripe-decor--black mt-6 bg-[#575757] px-6 py-[10px] text-white" @click="visible = true">
      預約時段
    </button>

    <BaseDialog v-model:visible="visible" @close="visible = false">
      <template #header>
        <div class="text-2xl font-medium">預約時段</div>
      </template>
      <form id="reserve" @submit.prevent="confirm">
        <div class="form-row mb-4 grid grid-cols-[90px,1fr] gap-1">
          <label class="text-sm font-bold leading-8" for="form-name">姓名</label>
          <input
            id="form-name"
            placeholder="王小明"
            required
            class="rounded border px-2 text-sm leading-8"
            type="text"
            name="name"
          />
        </div>
        <div class="form-row mb-4 grid grid-cols-[90px,1fr] gap-1">
          <label class="text-sm font-bold leading-8" for="form-tel">電話</label>
          <input
            id="form-tel"
            pattern="[0-9]+"
            required
            class="rounded border px-2 text-sm leading-8"
            type="tel"
            name="tel"
            placeholder="0912123123"
          />
        </div>
        <div class="form-row mb-4 grid grid-cols-[90px,1fr] gap-1">
          <label class="text-sm font-bold leading-8" for="form-date">預約起訖</label>
          <div class="flex items-center justify-between">
            <input
              id="form-date"
              class="rounded border px-2 text-sm leading-8"
              onclick="this.showPicker()"
              type="date"
              name="date-start"
              :min="formatYearToDayByKebab(+new Date())"
              :value="formatYearToDayByKebab(selected[0])"
              @change="($event) => change(0, ($event.target as HTMLInputElement).value)"
            />
            ~
            <input
              class="rounded border px-2 text-sm leading-8"
              onclick="this.showPicker()"
              type="date"
              name="date-end"
              :min="formatYearToDayByKebab(+new Date())"
              :value="formatYearToDayByKebab(selected[1])"
              @change="($event) => change(1, ($event.target as HTMLInputElement).value)"
            />
          </div>
        </div>
      </form>
      <div class="-mx-10 bg-[#EDEDED] px-10 py-4 text-sm tracking-[1.3px] text-[#6D7278]">
        <p class="flex justify-between">
          <span>平日時段</span>
          <span>{{ calDays.normal }}夜</span>
        </p>
        <p class="flex justify-between">
          <span>假日時段</span>
          <span>{{ calDays.holiday }}夜</span>
        </p>
      </div>
      <div class="mt-2 mb-8 text-right text-[26px] leading-[38px] tracking-[2.7px] text-[#FF5C5C]">
        = NT.{{ price }}
      </div>
      <template #footer>
        <div class="flex justify-between">
          <button class="bg-[#d8d8d8] px-5 py-[10px] text-sm tracking-[1.5px] text-[#6D7278]" @click="cancel">
            取消
          </button>
          <button form="reserve" type="submit" class="bg-[#484848] px-5 py-[10px] text-sm tracking-[1.5px] text-white">
            確定預約
          </button>
        </div>
      </template>
    </BaseDialog>
  </div>
</template>

<style lang="scss" scoped>
.book-btn {
  position: relative;
  &.stripe-decor--black::after {
    left: 5px;
    bottom: -5px;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>
