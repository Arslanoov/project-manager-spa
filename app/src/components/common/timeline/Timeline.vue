<template>
  <div class="timeline">
    <div
      v-for="(day, index) in formattedTimeline"
      @click="onDateChange(index)"
      :key="day.index"
      :class="activeIndex === index ? 'day_active' : ''"
      class="timeline__day day"
    >
      <div class="day__weekday">{{ $t(day.weekday) }}</div>
      <div class="day__index">{{ day.index }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

const WEEK = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
]

/**
 * Daily schedule timeline
 * @version 1.0.0
 */
@Component({})

export default class Timeline extends Vue {
  @Prop([Number]) readonly daysCount: number | undefined
  @Prop([Number]) readonly defaultIndex: number | undefined
  @Prop([Date]) readonly startDate: Date | undefined

  public activeIndex = this.defaultIndex

  public onDateChange(index: number) {
    const changeDate = new Date((this.startDate as Date).getTime())
    changeDate.setDate(changeDate.getDate() + index)

    this.activeIndex = index

    return this.$emit('date-change', {
      day: changeDate.getDate(),
      month: changeDate.getMonth() + 1,
      year: changeDate.getFullYear(),
      index,
    })
  }

  public get formattedTimeline() {
    const timeline = []

    const newDate = new Date((this.startDate as Date).getTime())
    for (let i = 0; i < (this.daysCount as number); i++) {
      timeline.push({
        weekday: WEEK[newDate.getDay()],
        index: newDate.getDate()
      })

      newDate.setDate(newDate.getDate() + 1)
    }

    return timeline
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  padding: 1rem 0;

  border-bottom: .1rem solid rgba($downriver, .1);

  @include tablet {
    justify-content: flex-start;
  }
}

.day {
  text-align: center;

  color: $downriver;

  @include pointer-on-hover();

  &:not(:last-of-type) {
    @include tablet {
      margin-right: 3rem;
    }
  }

  &_active {
    position: relative;

    color: $indigo;

    &::after {
      content: "";

      position: absolute;
      bottom: -1rem;
      left: 0;
      right: 0;

      height: .1rem;

      background-color: $indigo;
    }
  }

  &__weekday {
    font-size: 1.4rem;

    opacity: .3;
  }

  &__index {
    font-size: 1.6rem;
    font-weight: $semi-bold;
  }
}
</style>

<i18n>
{
  "en": {
    "SUN": "SUN",
    "MON": "MON",
    "TUE": "TUE",
    "WED": "WED",
    "THU": "THU",
    "FRI": "FRI",
    "SAT": "SAT"
  },
  "ru": {
    "SUN": "ВС",
    "MON": "ПН",
    "TUE": "ВТ",
    "WED": "СР",
    "THU": "ЧТ",
    "FRI": "ПТ",
    "SAT": "СБ"
  }
}
</i18n>