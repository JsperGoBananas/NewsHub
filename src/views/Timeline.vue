<template>
  <div class="timeline">
    <NewsItem v-for="newsItem in news" :key="newsItem.id" :news="newsItem" />
    <div class="sentinel"></div> <!-- 这个元素用于检测滚动到页面底部 -->
  </div>
</template>

  
  <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import NewsItem from '@/components/NewsItem.vue';
import { mainStore } from "@/store";
import axios from "@/api/request";

const store = mainStore();
const news = ref([]);
const page = ref(1); // 当前页数
const isLoading = ref(false); // 标记是否正在加载数据

onMounted(() => {
  getTimeLineData();

  // 设置观察者，用于检测是否到底部
  const observer = new IntersectionObserver(loadMore, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  // 观察目标元素（可以是页面底部的某个空白div）
  const sentinel = document.querySelector('.sentinel');
  if (sentinel) {
    observer.observe(sentinel);
  }

  // 在组件销毁前取消观察
  onBeforeUnmount(() => {
    observer.disconnect();
  });
});

const getTimeLineData = async () => {
  if (isLoading.value) return; // 如果已经在加载中，则不重复请求
  isLoading.value = true;

  try {
    const sources = store.newsArr.filter((item) => item.isShow).map((item) => item.id);
    const response = await axios.post('/hotlist/timeline', {
      size: 50,
      page: page.value,
      sources: sources,
    });
    news.value.push(...response.data); // 将新数据追加到现有数据中
    page.value++; // 页数加1
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false; // 完成加载
  }
};

// 当观察到元素出现在视窗中时，触发加载更多
const loadMore = (entries) => {
  const entry = entries[0];
  if (entry.isIntersecting) {
    getTimeLineData();
  }
};
</script>

  
<style scoped>
.timeline {
  padding: 20px;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 40px; /* Adjust the line position to make it center-aligned */
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #ddd;
  z-index: -1;
}

.sentinel {
  height: 1px;
}
</style>

  