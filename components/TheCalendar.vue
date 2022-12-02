<script setup lang="ts">
const props = defineProps({
  selected: {
    type: Array<number>,
    default: () => []
  },
  booking: {
    type: Array<number>,
    default: () => []
  }
})
const emit = defineEmits(['update:selected'])

const isLeapYear = (year: number) => {
  let isLeapYear = false

  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    isLeapYear = true
  }

  return isLeapYear
}
const getMonthDays = (year: number, month: number): number => {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let days = monthDays[month - 1]
  if (month === 2 && isLeapYear(year)) {
    days = 29
  }
  return days
}

const getWeek = (year: number, month: number, day: number) => {
  const date = new Date()
  date.setUTCFullYear(year, month - 1, day)
  return date.getUTCDay()
}

const getToday = () => {
  const today = new Date()
  today.setUTCHours(0)
  today.setUTCMinutes(0)
  today.setUTCSeconds(0)
  today.setUTCMilliseconds(0)
  return today
}

const today = getToday()
const year = ref(today.getFullYear())
const month = ref(today.getMonth() + 1)

const monthCalendar = computed(() => {
  const days = getMonthDays(year.value, month.value)
  const startDay = getWeek(year.value, month.value, 1)
  return [
    ...new Array(startDay),
    ...new Array(days).fill(0).map((_, i) => {
      const date = new Date(Date.UTC(year.value, month.value - 1, i + 1))
      return date
    })
  ]
})

const changeMonth = (val: number) => {
  if (month.value + val < 1) {
    year.value -= 1
    month.value = 12
  } else if (month.value + val > 12) {
    year.value += 1
    month.value = 1
  } else {
    month.value += val
  }
}

const selected = toRef(props, 'selected')
const selectDate = (val: number) => {
  if (+today > val) return
  if (selected.value.includes(val) && selected.value.length !== 2) return
  const isBooked = props.booking.find((i) => +i === val)
  if (isBooked) return
  if (selected.value.length === 2) {
    emit('update:selected', [val])
  } else {
    const ary = [...selected.value, val]
    ary.sort()
    emit('update:selected', ary)
  }
}
const calCalendarClass = (day: number) => {
  const isPast = +today > day

  const isToday = +today === +day
  const isFirst = selected.value[0] === +day
  const isLast = selected.value[1] === +day
  const isSelected = selected.value[0] <= +day && selected.value[1] >= +day
  const isBooked = props.booking.find((i) => {
    return +i === day
  })

  if (isPast) {
    return '!cursor-default text-gray-300'
  } else if (isBooked) {
    return '!cursor-default stripe-decor--black'
  } else if (isFirst || isLast || isSelected) {
    return 'bg-[#ccc]'
  } else if (isToday) {
    return 'bg-red-500 text-white rounded-full'
  }
}
</script>

<template>
  <div class="calendar aspect-square p-7">
    <div class="mb-5 flex items-center justify-between text-lg">
      <div class="cursor-pointer" @click="changeMonth(-1)"><i class="icon-left-open-big"></i></div>
      <div class="font-bold">{{ year }} / {{ month }}</div>
      <div class="cursor-pointer" @click="changeMonth(1)"><i class="icon-right-open-big"></i></div>
    </div>
    <div class="mb-7 grid grid-cols-7 text-center [&_span]:px-2">
      <span>日</span>
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
    </div>
    <div class="grid grid-cols-7 grid-rows-5 items-center text-center">
      <span
        v-for="day of monthCalendar"
        :key="day"
        class="calendar-day flex aspect-square w-full cursor-pointer items-center justify-center"
        :class="calCalendarClass(+day)"
        @click="() => selectDate(+day)"
        >{{ day?.getDate() }}</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
}

.calendar-day {
  position: relative;
  &.stripe-decor--black::after {
    @apply inset-0;
  }
}
</style>
