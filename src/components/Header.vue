<template>
  <n-card :bordered="false" class="header" content-style="padding: 0">
    <section>
      <div class="logo" @click="router.push('/')">
        <img src="/ico/favicon.png" alt="logo" />
        <div class="name">
          <n-text>今日热榜</n-text>
          <n-text :depth="3">掌握全球热点，定制你的专属资讯源</n-text>
        </div>
      </div>
      <div class="current-time" v-if="store.timeData">
        <n-text class="time">{{ store.timeData.time.text }}</n-text>
        <n-text class="date" :depth="3">
          {{
            store.timeData.lunar.GanZhiYear +
            "年 " +
            store.timeData.lunar.text +
            " " +
            store.timeData.time.weekday
          }}
        </n-text>
      </div>
      <div class="current-time" v-else>
        <n-text class="time">时间获取中</n-text>
      </div>
      <div class="controls">
        <n-space justify="end">
          <n-popover>
            <template #trigger>
              <n-button secondary strong round @click="showModal = true">
                <template #icon>
                  <n-icon :component="Add" />
                </template>
              </n-button>
            </template>
            添加链接
          </n-popover>
          <n-popover>
            <template #trigger>
              <n-button secondary strong round @click="switchMode()">
                <template #icon>
                  <n-icon :component="Switch" />
                </template>
              </n-button>
            </template>
            切换页面
          </n-popover>
          <n-popover v-if="showRefresh">
            <template #trigger>
              <n-button secondary strong round @click="router.go(0)">
                <template #icon>
                  <n-icon :component="Refresh" />
                </template>
              </n-button>
            </template>
            刷新页面
          </n-popover>
          <n-popover>
            <template #trigger>
              <n-button secondary strong round @click="
                store.setSiteTheme(
                  store.siteTheme === 'light' ? 'dark' : 'light'
                )
                ">
                <template #icon>
                  <n-icon :component="store.siteTheme === 'light' ? Moon : SunOne" />
                </template>
              </n-button>
            </template>
            {{ store.siteTheme === "light" ? "深色模式" : "浅色模式" }}
          </n-popover>
          <n-popover>
            <template #trigger>
              <n-button secondary strong round @click="router.push('/setting')">
                <template #icon>
                  <n-icon :component="SettingTwo" />
                </template>
              </n-button>
            </template>
            全局设置
          </n-popover>
        </n-space>
      </div>
      <div class="mobile">
        <n-dropdown :options="menuOptions" size="large" trigger="click" placement="bottom-end"
          @select="menuOptionsSelect">
          <n-button secondary strong round>
            <template #icon>
              <n-icon :component="HamburgerButton" />
            </template>
          </n-button>
        </n-dropdown>
      </div>
    </section>
    <!-- <div v-if="showDialog" class="dialog"> -->
    <!-- <n-dialog
      title="添加数据源"
      positive-text="添加"
      negative-text="取消"
      @positive-click="addLink"
      @negative-click="showDialog = false"
    >
      <n-input v-model:value="urlInput" placeholder="输入URL" clearable />
    </n-dialog> -->
    <!-- </div> -->
    

  </n-card>
  <n-modal v-model:show="showModal">
      <n-card class="dialog" title="添加RSS订阅链接" :bordered="true">
        <n-input v-model:value="urlInput" placeholder="请输入RSS链接" style="margin-bottom: 16px;">

        </n-input>
        <n-space>
          <n-button type="primary" @click="addLink">
            添加
          </n-button>
          <n-button @click="showModal = false">
            取消
          </n-button>
        </n-space>
      </n-card>
    </n-modal>
</template>

<script setup>
import {
  SunOne,
  Moon,
  Refresh,
  SettingTwo,
  HamburgerButton,
  Add,
  Switch,
} from "@icon-park/vue-next";
import { getCurrentTime } from "@/utils/getTime.js";
import { mainStore } from "@/store";
import { NText, NIcon } from "naive-ui";
import { useRouter } from "vue-router";
import axios from "@/api/request";
const router = useRouter();
const store = mainStore();
const timeInterval = ref(null);
const showRefresh = ref(false);

const showModal = ref(false); // State to show/hide the dialog
const urlInput = ref(""); // State to hold the input value

const addLink = () => {
  console.log(urlInput.value);
  if (urlInput.value.trim() !== "") {
      axios.post("/website/add", null, {
      params: {
        fetchDataUrl:urlInput.value,
      }
    })
      .then((response) => {
        if (response.code == '200') {
          store.newsArr.push(response.data);
          $message.success("新增订阅成功");
          
        } else {
          $message.error(response.message);
        }

        showModal.value = false; // Close the dialog

      })
      .catch((error) => {
        $message.error("Failed to add URL");
        console.error("Failed to add URL:", error);
      });
  }
};
function switchMode() {
  if (store.mode === "list") {
    store.setMode("timeline")
    return router.push("/timeline")
  } else {
    store.setMode("list")
    return router.push("/")
  }
};
// 移动端时间模块
const timeRender = () => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "6px 18px",
      },
    },
    [
      h(NText, null, {
        default: () =>
          store.timeData ? store.timeData.time.text : "时间获取失败",
      }),
      h(
        NText,
        { depth: 3, style: "font-size: 12px" },
        {
          default: () =>
            store.timeData
              ? store.timeData.lunar.GanZhiYear +
              "年 " +
              store.timeData.lunar.text +
              " " +
              store.timeData.time.weekday
              : "日期获取失败",
        }
      ),
    ]
  );
};

// 移动端菜单
const menuOptions = [
  {
    key: "header",
    type: "render",
    render: timeRender,
  },
  {
    key: "header-divider",
    type: "divider",
  },
  {
    label: "添加数据源",
    key: "add",
    icon: () => {
      return h(NIcon, null, {
        default: () => h(Add),
      });
    },
  },
  {
    label: "切换模式",
    key: "switch",
    icon: () => {
      return h(NIcon, null, {
        default: () => h(Switch),
      });
    },
  },
  {
    label: "刷新页面",
    key: "refresh",
    icon: () => {
      return h(NIcon, null, {
        default: () => h(Refresh),
      });
    },
  },

  {
    label: () => {
      return h(NText, null, {
        default: () => (store.siteTheme === "light" ? "深色模式" : "浅色模式"),
      });
    },
    key: "changeTheme",
    icon: () => {
      return h(NIcon, null, {
        default: () => (store.siteTheme === "light" ? h(Moon) : h(SunOne)),
      });
    },
  },
  {
    label: "全局设置",
    key: "setting",
    icon: () => {
      return h(NIcon, null, {
        default: () => h(SettingTwo),
      });
    },
  },
];

// 移动端下拉菜单点击事件
const menuOptionsSelect = (val) => {
  if (val === "refresh") {
    router.go(0);
  } else if (val === "changeTheme") {
    store.setSiteTheme(store.siteTheme === "light" ? "dark" : "light");
  } else if (val === "setting") {
    router.push("/setting");
  } else if (val === "switch") {
    switchMode()
  } else if (val === "add") {
    showModal.value = true
  }
};

// 监听路由参数变化
watch(
  () => router.currentRoute.value,
  (val) => {
    const isHome = val.path === "/";
    showRefresh.value = isHome ? true : false;
  }
);

onMounted(() => {
  window.$timeInterval = timeInterval.value = setInterval(() => {
    store.timeData = getCurrentTime();
  }, 1000);
  showRefresh.value = router.currentRoute.value?.path === "/" ? true : false;
});

onBeforeUnmount(() => {
  clearInterval(timeInterval.value);
});
</script>

<style lang="scss" scoped>
.dialog {
    width: 50% !important; // Add !important to force the style if needed
    max-width: 1000px; // Ensure it doesn't exceed a certain size on larger screens
  }
  @media (max-width: 768px){
    .dialog {
      width: 90% !important; // Adjust the width for smaller screens
    }
  }
.header {
  height: 118px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 24px 5vw;
  z-index: 2;
  top: 0;
  background-color: transparent;
  transition: all 0.3s;



  .controls {
    display: flex;
    align-items: center;
  }

  section {
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: space-between;

    .logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;

      img {
        width: 50px;
        height: 50px;
        margin-right: 16px;
        transition: all 0.3s;
      }

      .name {
        display: flex;
        flex-direction: column;

        span {
          &:nth-of-type(1) {
            font-size: 20px;
            font-weight: bold;
            transition: all 0.3s;
          }

          &:nth-of-type(2) {
            font-size: 12px;
          }
        }
      }
    }

    .current-time {
      display: flex;
      flex-direction: column;
      align-items: center;

      .date {
        font-size: 12px;
      }
    }

    .mobile {
      display: none;
    }

    @media (max-width: 768px) {
      display: flex;

      .logo {
        img {
          width: 40px;
          height: 40px;
        }

        .name {
          span {
            &:nth-of-type(1) {
              font-size: 18px;
            }
          }
        }
      }

      .current-time,
      .controls {
        display: none;
      }

      .mobile {
        display: block;
      }

    }
  }
}
</style>
