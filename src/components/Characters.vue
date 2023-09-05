<template>
  <div class="status">
    <h2>{{ name }}</h2>
    <div class="healthbar">
      <div
        class="healthbar__value"
        :style="name === 'player' ? playerHpStyle : mosterHpStyle"
      ></div>
    </div>
    <p>HP: {{ Health }}</p>

    <div v-if="name === 'player' && winner === null" class="acting">
      <button @click="attackMonster" :style="{ 'background-color': 'red' }">공격하기</button>
      <button
        @click="specialAttMonster"
        :disabled="attCondition"
        :style="{ 'background-color': attCondition ? 'grey' : 'red' }"
      >
        특수공격
      </button>
      <button
        :disabled="attCondition"
        @click="healingCharacters"
        :style="{ 'background-color': attCondition ? 'grey' : 'green' }"
      >
        회복하기
      </button>
      <button @click="surrenGame">항복하기</button>
    </div>
  </div>
</template>

<script>
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    Health: {
      type: Number,
      required: true
    },
    winner: {
      required: false,
      default: false
    },
    attCnt: {
      type: Number,
      required: false,
      default: 0
    },
    attCondition: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  emits: ['click-attbtn', 'click-specialbtn', 'click-healbtn', 'click-surrender'],
  methods: {
    attackMonster() {
      const attValueMoster = getRandomValue(10, 15)
      const attValuePlayer = getRandomValue(9, 13)
      this.$emit('click-attbtn', attValueMoster, attValuePlayer)
    },
    specialAttMonster() {
      const attSpecialValueMoster = getRandomValue(18, 25)
      const attValuePlayer = getRandomValue(9, 13)
      this.$emit('click-specialbtn', attSpecialValueMoster, attValuePlayer)
    },
    healingCharacters() {
      const healPlayer = getRandomValue(10, 20);
      const healMonster = getRandomValue(10, 20);
      this.$emit('click-healbtn', healPlayer, healMonster)
    },
    surrenGame() {
      const value = 'Monster';
      this.$emit('click-surrender', value)
    }
  },

  computed: {
    mosterHpStyle() {
      if (this.Health < 0) {
        return { width: '0%' }
      }
      return { width: this.Health + '%' }
    },
    playerHpStyle() {
      if (this.Health < 0) {
        return { width: '0%' }
      } else if (this.Health < 50) {
        return {
          width: this.Health + '%',
          backgroundColor: 'red'
        }
      }
      return { width: this.Health + '%' }
    }
  }
}
</script>

<style>
.status {
  width: 20rem;
}
.acting button {
  font: inherit;
  white-space: nowrap;
  border: 1px solid black;
  background-color: #00a5ff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin: 1rem;
  width: 6rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
.actingAtt {
  background-color: red;
}
.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
}
</style>
