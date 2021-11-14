<template>
  <h1>TO DO LIST TEST APP</h1>
  <el-input type="text" placeholder="Задача...." v-model="newTodo" id="newTodo" v-on:keyup.enter="addTodo" />
  <h3>Количество задач : {{ todosCount }}</h3>
  <el-radio v-model="filterValues" label="all" border>Все</el-radio>
  <el-radio v-model="filterValues" label="compleate" border>Выполненные</el-radio>
  <el-radio v-model="filterValues" label="active" border>Активные</el-radio>
  <el-button @click="handleClearCompleate" v-model="filterValues" :disabled="!isDisabled">Сlear completed</el-button>
  <ol>
    <li v-for="(el, index) in currentLust" :key="index">
      <span @click="handleCheckItem(index)" :class="{ done: el?.done }">{{ el?.title }}</span>
      <el-button type="danger" @click.stop="handleDeleteItem(index)">Удалить задачу</el-button>
    </li>
  </ol>
</template>

<script>
import { useStore } from "vuex";
import { reactive, toRefs, computed, watch, onMounted } from "vue";
import itemHelp from "../use/itemHelp";

export default {
  name: "List",
  setup() {
    const store = useStore();
    const list = computed(() => store.getters["list"]);
    const { addTodo, newTodo } = itemHelp();

    const data = reactive({
      todosCount: computed(() => store.getters["list"].length),
      currentLust: [],
      filterValues: "all",
      isDisabled: computed(() => list.value.length && list.value?.find(item => item.done)),
    });

    const templateFuncs = reactive({
      handleDeleteItem: (index) => {
        store.dispatch("removeItem", index);
      },
      handleCheckItem: (index) => {
        store.dispatch("checkItem", index);
      },
      changeCurrentList: (currentValue) => {
        data.currentLust = list.value;
        switch (currentValue) {
          case "compleate":
            data.currentLust = data.currentLust.filter((item) => item.done);
            break;
          case "active":
            data.currentLust = data.currentLust.filter((item) => !item.done);
            break;
          default:
            data.currentLust = list.value;
            break;
        }
      },
      handleClearCompleate: () => {
        store.dispatch("clearCompleate");
        templateFuncs.changeCurrentList(data.filterValues);
      },
    });

    watch(() => data.filterValues,
      (currentValue) => {
        templateFuncs.changeCurrentList(currentValue);
      }
    );

    onMounted(() => {
      data.currentLust = list.value;
    });

    return {
      addTodo,
      newTodo,
      list,
      ...toRefs(data),
      ...toRefs(templateFuncs),
    };
  },
};
</script>

<style scoped>
ol {
  text-align: left;
  user-select: none;
}
li {
  margin-bottom: 10px;
  width: 100%;
}
span {
  cursor: pointer;
}
button {
  margin-left: 20px;
}
.done {
  text-decoration: line-through;
  color: green;
}
</style>
