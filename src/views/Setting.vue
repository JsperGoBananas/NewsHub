<template>
  <div class="setting">
    <div class="title">{{ $t("settings.title") }}</div>
    <n-h6 prefix="bar">{{ $t("settings.basicSettings") }}</n-h6>
    <n-card class="set-item">
      <div class="top">
        <div class="name">
          <n-text class="text">{{ $t("settings.theme.lightDarkMode") }}</n-text>
        </div>
        <n-select
          class="set"
          v-model:value="siteTheme"
          :options="themeOptions"
          @update:value="siteThemeAuto = false"
        />
      </div>
    </n-card>
    <n-card class="set-item">
      <div class="top">
        <div class="name">
          <n-text class="text">{{ $t("settings.theme.autoFollowSystem") }}</n-text>
          <n-text class="tip" :depth="3">{{ $t("settings.theme.tipAutoFollowSystem") }}</n-text>
        </div>
        <n-switch v-model:value="siteThemeAuto" :round="false" @update:value="themeAutoOpen" />
      </div>
    </n-card>
    <n-card class="set-item">
      <div class="top">
        <div class="name">
          <n-text class="text">{{ $t("settings.linkOpenType.title") }}</n-text>
          <n-text class="tip" :depth="3">{{ $t("settings.linkOpenType.tip") }}</n-text>
        </div>
        <n-select
          class="set"
          v-model:value="linkOpenType"
          :options="linkOptions"
        />
      </div>
    </n-card>
    <n-card class="set-item">
      <div class="top" style="flex-direction: column; align-items: flex-start">
        <div class="name">
          <n-text class="text">{{ $t("settings.listTextSize.title") }}</n-text>
          <n-card
            class="tip"
            :style="{
              backgroundColor: 'var(--n-border-color)',
              margin: '12px 0',
            }"
          >
            <n-text :style="{ fontSize: listFontSize + 'px' }">
              {{ $t("settings.listTextSize.tip") }}
            </n-text>
          </n-card>
        </div>

        <n-slider
          v-model:value="listFontSize"
          :tooltip="false"
          :max="20"
          :min="14"
          :step="0.01"
          :marks="{
            14: $t('settings.listTextSize.smaller'),
            16: $t('settings.listTextSize.default'),
            20: $t('settings.listTextSize.larger'),
          }"
        />
      </div>
    </n-card>
    <n-card class="set-item">
      <div class="top">
        <div class="name">
          <n-text class="text">{{ $t("settings.sort.title") }}</n-text>
        </div>
        <n-card class="sort-control">
          <n-switch
            v-model:value="isDraggable"
            :round="false"
            @update:value="tips"
          />
          <n-text class="tip" :depth="3">
            {{ $t("settings.sort.tip") }}
          </n-text>
        </n-card>
      </div>
      <draggable
        :list="newsArr"
        :animation="200"
        class="mews-group"
        item-key="order"
        @start="handleDragStart"
        @end="saveSoreData()"
        :disabled="!isDraggable"
      >
        <template #item="{ element }">
          <n-card
            class="item"
            embedded
            :content-style="{ display: 'flex', alignItems: 'center' }"
          >
            <div class="desc" :style="{ opacity: element.isShow ? null : 0.6 }">
              <n-avatar
                class="logo"
                :src="`${element.iconUrl}`"
                :fallback-src="`/logo/${element.id}.ico`"
              />
              <n-text class="news-name" v-html="element.title" />
            </div>
            <n-switch
              class="switch"
              :round="false"
              size="large"
              v-model:value="element.isShow"
              @update:value="saveSoreData(element.title, element.isShow)"
            />
          </n-card>
        </template>
      </draggable>
    </n-card>
    <n-h6 prefix="bar">{{ $t("settings.miscellaneous") }}</n-h6>
    <n-card class="set-item">
      <div class="top">
        <div class="name">
          <n-text class="text">{{ $t("settings.reset.title") }}</n-text>
          <n-text class="tip" :depth="3">
            {{ $t("settings.reset.tip") }}
          </n-text>
        </div>
        <n-popconfirm @positive-click="reset">
          <template #trigger>
            <n-button type="warning"> {{ $t("settings.reset.buttonText") }} </n-button>
          </template>
          {{ $t("settings.reset.confirm") }}
        </n-popconfirm>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { useOsTheme } from "naive-ui";
import draggable from "vuedraggable";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const store = mainStore();
const osThemeRef = useOsTheme();
const isDraggable = ref(false);
const {
  siteTheme,
  siteThemeAuto,
  newsArr,
  linkOpenType,
  headerFixed,
  listFontSize,
} = storeToRefs(store);

console.log(newsArr)
// 深浅模式
const themeOptions = ref([
  {
    label: t("header.light"),
    value: "light",
  },
  {
    label: t("header.dark"),
    value: "dark",
  },
]);

// 榜单跳转
const linkOptions = [
  {
    label: t("settings.linkOpenType.new"),
    value: "open",
  },
  {
    label: t("settings.linkOpenType.current"),
    value: "href",
  },
];

const tips = () => {
  if (isDraggable.value) {
    $message.success(t("settings.messages.sortEnabled"));
  } else {
    $message.error(t("settings.messages.sortDisabled"));
  }
};

// 开启明暗自动跟随
const themeAutoOpen = (val) => {
  console.log(osThemeRef.value);
  if (val) {
    siteTheme.value = osThemeRef.value;
    $message.success(t("settings.messages.themeAutoFollow"));
  }
};

// 恢复默认排序
const restoreDefault = () => {
  newsArr.value = newsArr.value.sort((a, b) => a.order - b.order);
  $message.success(t("settings.messages.restoreDefaultSort"));
};

// 将排序结果写入
const saveSoreData = (name = null, open = false) => {
  const status = open ? t("settings.messages.success") : t("settings.messages.fail");
  console.log(status)
  $message.success(
    name ? t("settings.messages.sortToggle", { name, status }) : t("settings.messages.sortSuccess")
  );
  localStorage.setItem("mainData", JSON.stringify(newsArr.value));
};


// 重置数据
const reset = () => {
  if (typeof $timeInterval !== "undefined") clearInterval($timeInterval);
  localStorage.clear();
  location.reload();
};
</script>

<style lang="scss" scoped>
.setting {
  .title {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 40px;
    font-weight: bold;
  }

  .n-h {
    padding-left: 16px;
    font-size: 20px;
    margin-left: 4px;
  }

  .set-item {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 12px;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .name {
        font-size: 18px;
        display: flex;
        flex-direction: column;

        .tip {
          font-size: 12px;
          border-radius: 8px;
        }
      }
      .sort-control {
        display: flex;
        align-items: center;
        flex-direction: column; /* 确保子项在一行显示 */
        max-width: 200px; /* 设置最大宽度限制 */
        flex-shrink: 0; /* 防止缩小 */
        justify-content: flex-end; /* 右对齐 */
      }

      .set {
        max-width: 200px;
      }
    }

    

    .mews-group {
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(5, minmax(0px, 1fr));
      gap: 24px;

      @media (max-width: 1666px) {
        grid-template-columns: repeat(4, minmax(0px, 1fr));
      }

      @media (max-width: 1200px) {
        grid-template-columns: repeat(3, minmax(0px, 1fr));
      }

      @media (max-width: 890px) {
        grid-template-columns: repeat(2, minmax(0px, 1fr));
      }

      @media (max-width: 620px) {
        grid-template-columns: repeat(1, minmax(0px, 1fr));
      }

      .item {
        cursor: pointer;

        .desc {
          display: flex;
          align-items: center;
          width: 100%;
          transition: all 0.3s;

          .logo {
            background: transparent;
            width: 40px;
            height: 40px;
            margin-right: 12px;
          }

          .news-name {
            font-size: 16px;
          }
        }

        .switch {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
