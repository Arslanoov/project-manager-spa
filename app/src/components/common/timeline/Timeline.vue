<template>
  <div class="timeline">
    <div
      v-for="(day, index) in formattedTimeline"
      :key="day.index"
      :class="activeIndex === index ? 'day_active' : ''"
      class="timeline__day day"
    >
      <div class="day__weekday">{{ day.weekday }}</div>
      <div class="day__index">{{ day.index }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

const WEEK = [
  'SAT',
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
]

@Component({})

export default class Timeline extends Vue {
  @Prop([Number]) readonly daysCount: number | undefined
  @Prop([Number]) readonly activeIndex: number | undefined
  @Prop([Date]) readonly startDate: Date | undefined

  public get formattedTimeline() {
    console.log('compute')
    const timeline = []

    const newDate = new Date((this.startDate as Date).getTime())
    for (let i = 0; i < (this.daysCount as number); i++) {
      newDate.setDate(newDate.getDate() + 1)

      timeline.push({
        weekday: WEEK[newDate.getDay()],
        index: newDate.getDate() - 1
      })
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

  border-bottom: .1rem solid rgba(#0B204C, .1);
}

.day {
  text-align: center;

  color: #0B204C;

  @include pointer-on-hover();

  &_active {
    position: relative;

    color: #5A55CA;

    &::after {
      content: "";

      position: absolute;
      bottom: -10px;
      left: 0;
      right: 0;

      height: .1rem;

      background-color: #5A55CA;
    }
  }

  &__weekday {
    font-size: 1.4rem;

    opacity: .3;
  }

  &__index {
    font-size: 1.6rem;
    font-weight: 600;
  }
}
</style>