<template>
  <div class="news-item">
    <div class="logo">
      <!-- <img :src="`/logo/${news.source}.png`" fallback-src="/favicon.png" /> -->
      <n-avatar
            class="ico"
            :src="`/logo/${news.source}.ico`"
            :fallback-src="`${news.iconUrl}`"
          />
    </div>
    <div class="content">
      <div class="source">{{ news.title }}</div>
      <div class="time">{{ updateTime }}</div>
      <ul>
        <li  v-for="item in news.newsList" :key="item.id" :style="{ fontSize: store.listFontSize + 'px' }" @click="navigate(item.url)">{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { formatTime } from "@/utils/getTime";
import {mainStore} from "@/store";
const store = mainStore();
const updateTime = ref(null);
const props = defineProps({
  news: {
    type: Object,
    required: true
  }
});

const navigate = (url) => {
  window.open(url, "_blank");
}
watch(
() => store.timeData,
() => {
  console.log(props.news)
  // if (news) {
    updateTime.value = formatTime(props.news.updatedTime);
  // }
}
);
const onMounted = () => {
  console.log(props.news)
}
</script>

<style scoped>
.news-item {
  display: flex;
  align-items: flex-start; /* Align items at the top */
  margin-bottom: 40px; /* Add bottom margin to avoid overlap */
  position: relative;
}

.logo {
  
  display: flex;
  align-items: center;
  margin-right: 10px; /* Add margin between logo and content */
}

.logo .n-avatar {
  background-color: transparent;
  width: 40px;
  height: 40px;
}

.content {
  margin-left: 20px; /* Adjust left margin for better spacing */
}

.time {
  font-size: 12px;
  color: #888;
}

.source {
  font-size: 20px;
  color: #888;
}

ul {
  padding-left: 20px;
}

li {
  
  list-style-type: circle;
  margin-bottom: 5px;
  cursor: pointer; /* 显示手型光标 */
}

li:hover {
  color: #68adf7; /* 悬停时改变文字颜色 */
  text-decoration: underline; /* 悬停时显示下划线 */
}
</style>
