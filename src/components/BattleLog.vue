<template>
  <li class="listyle" v-for="log in battlelogs" :key="log.actionValue">
    <span
      :class="{
        'log--player ': log.actionBy === 'player',
        'log--monster': log.actionBy === 'monster'
      }"
      > {{ log.actionBy === 'player' ? 'player' : 'monster' }} </span
    >가
    <span class="actionValue"> {{ log.actionValue }} </span> 만큼
    <span
      class="actionType"
      :class="{ 'log--special': log.actionType === 'Special Attack',
      'log--heal': log.actionType === 'heal' }"
      > {{ log.actionType }} </span
    >하였습니다.
  </li>
</template>

<script>
export default {
  props: {
    battlelogs: {
      type: Array,
      require: true
    }
  }
}
</script>

<style>
.listyle {
  list-style: none;
  font-size: 1.2rem;
}
.actionValue {
  color: red;
}
.actionType {
  color: cornflowerblue;
}
.log--heal {
  color: green;
}
.log--special {
  color: gold;
}
.log--player {
  color: #7700ff;
}
.log--monster {
  color: #da8d00;
}
</style>
