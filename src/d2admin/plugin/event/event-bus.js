// https://alligator.io/vuejs/global-event-bus/
import Vue from 'vue'
export default new Vue()

//* ******** Send Event ********/
// import { EventBus } from '@/util/event-bus.js';
//
// export default {
//   data() {
//     return {
//       clickCount: 0
//     }
//   },
//
//   methods: {
//     emitGlobalClickEvent() {
//       this.clickCount++;
//       EventBus.$emit('i-got-clicked', this.clickCount);
//     }
//   }
// }

//* ******** Event Handler ********/
// import { EventBus } from './event-bus.js';
//
// EventBus.$on('i-got-clicked', clickCount => {
//   console.log(`Oh, that's nice. It's gotten ${clickCount} clicks! :)`)
// });
