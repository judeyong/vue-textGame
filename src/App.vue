<template>
  <section>
    <h2>Monster Slayer</h2>
    <main>
      <characters-stat
        :name="player.name"
        :Health="player.hp"
        :attCondition="player.specialAttBtnState"
        :winner="winner"
        @click-attbtn="attackMonster"
        @click-specialbtn="specialAttackMonster"
        @click-healbtn="healbtn"
        @click-surrender="surrender"
      ></characters-stat>
      <div v-if="this.winner">
        <h1>승자: {{ this.winner }}</h1>
        <button @click="newgame">새 게임</button>
      </div>
      <div v-else>
        <h2>Battle Log</h2>
        <ul>
          <battle-log :battlelogs="battleLogs"></battle-log>
        </ul>
      </div>
      <characters-stat :name="monster.name" :Health="monster.hp" :attCnt="0"></characters-stat>
    </main>
  </section>
</template>

<script>
import BattleLog from './components/BattleLog.vue'
import Characters from './components/Characters.vue'

export default {
  data() {
    return {
      player: {
        name: 'player',
        hp: 100,
        specialAttCnt: 0,
        specialAttBtnState: true
      },
      monster: {
        name: 'monster',
        hp: 100
      },
      winner: null,
      battleLogs: []
    }
  },

  watch: {
    'player.hp': function (value) {
      if (value <= 0 && this.monster.hp <= 0) {
        this.winner = 'Draw'
      } else if (value <= 0) {
        this.winner = 'monster'
      }
    },
    'monster.hp': function (value) {
      console.log(value)
      if (value <= 0 && this.player.hp <= 0) {
        this.winner = 'Draw'
      } else if (value <= 0) {
        this.winner = 'player'
      }
    }
  },

  methods: {
    newgame() {
      ;(this.player.hp = 100),
        (this.player.specialAttCnt = 0),
        (this.player.specialAttBtnState = true)
      ;(this.monster.hp = 100), (this.winner = null), (this.battleLogs = [])
    },

    attackMonster(attMonster, attPlayer) {
      if (this.player.specialAttCnt > 1) {
        this.player.specialAttCnt = 3
        this.player.specialAttBtnState = false
      }
      //hp 음수될 경우.
      if (this.monster.hp - attMonster <= 0) {
        this.monster.hp = 0
      } else {
        this.monster.hp -= attMonster
      }
      this.player.specialAttCnt += 1
      this.addBattleLog('player' , 'Attack', attMonster);
      this.attackPlayer(attPlayer)
    },

    attackPlayer(value) {
      this.addBattleLog('monster' , 'Attack', value);
      if (this.player.hp - value <= 0) {
        this.player.hp = 0
      } else {
        this.player.hp -= value
      }
    },

    specialAttackMonster(attSpecialMonster, attPlayer) {
      if (this.monster.hp - attSpecialMonster <= 0) {
        this.monster.hp = 0
      } else {
        this.monster.hp -= attSpecialMonster
      }
      this.player.specialAttCnt = 0;
      this.player.specialAttBtnState = true;
      this.addBattleLog('player' , 'Special Attack', attSpecialMonster);
      this.attackPlayer(attPlayer)
    },

    healbtn(healPlayer, healMonster) {
      if (this.player.hp + healPlayer > 100) {
        this.player.hp = 100
      } else if (this.monster.hp + healMonster > 100) {
        this.monster.hp = 100
      }
      this.player.hp += healPlayer
      this.monster.hp += healMonster
      this.player.specialAttCnt = 0
      this.player.specialAttBtnState = true
      this.addBattleLog('player', 'heal', healPlayer);
      this.addBattleLog('monster', 'heal', healMonster);
    },

    surrender(value) {
      this.winner = value
      this.player.hp = 0
      this.player.specialAttCnt = 0
      this.player.specialAttBtnState = true
    },

    addBattleLog(who, type, value) {
      this.battleLogs.unshift({
        actionBy: who,
        actionType: type,
        actionValue: value
      })
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

#app section {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#app main {
  border: 1px solid #ccc;
  border-radius: 12px;
  width: 90%;
  height: 35rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
button {
  font: inherit;
  white-space: nowrap;
  border: none;
  background-color: red;
  color: white;
  padding: 1rem 1rem;
  border-radius: 12px;
  margin: 1rem;
  width: 8rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
</style>
