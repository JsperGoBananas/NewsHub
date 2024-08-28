import axios from "axios";
import { defineStore } from "pinia";

export const mainStore = defineStore("mainData", {
  state: () => {
    return {
      // 系统主题
      siteTheme: "dark",
      siteThemeAuto: true,
      // 新闻类别
      defaultNewsArr: [
        // {
        //   label: "哔哩哔哩",
        //   name: "bilibili",
        //   order: 0,
        //   show: false,
        // },
        // {
        //   label: "微博",
        //   name: "weibo",
        //   order: 1,
        //   show: false,
        // },
        // {
        //   label: "抖音",
        //   name: "douyin",
        //   order: 2,
        //   show: false,
        // },
        // {
        //   label: "知乎",
        //   name: "zhihu",
        //   category: "default",
        //   order: 3,
        //   show: true,
        // },
        // {
        //   label: "36氪",
        //   name: "36kr",
        //   category: "default",
        //   order: 4,
        //   show: true,
        // },
        // {
        //   label: "百度",
        //   name: "baidu",
        //   order: 5,
        //   show: false,
        // },
        // {
        //   label: "少数派",
        //   name: "sspai",
        //   category: "default",
        //   order: 6,
        //   show: true,
        // },
        // {
        //   label: "IT之家",
        //   name: "ithome",
        //   order: 7,
        //   show: false,
        // },
        // {
        //   label: "澎湃新闻",
        //   name: "thepaper",
        //   order: 8,
        //   show: false,
        // },
        // {
        //   label: "今日头条",
        //   name: "toutiao",
        //   order: 9,
        //   show: false,
        // },
        // {
        //   label: "百度贴吧",
        //   name: "tieba",
        //   order: 10,
        //   show: false,
        // },
        // {
        //   label: "稀土掘金",
        //   name: "juejin",
        //   order: 11,
        //   show: false,
        // },
        // {
        //   label: "腾讯新闻",
        //   name: "qq-news",
        //   order: 12,
        //   show: false,
        // },
        // {
        //   label: "豆瓣电影",
        //   name: "douban-movie",
        //   order: 13,
        //   show: false,
        // },
        // {
        //   label: "原神",
        //   name: "genshin",
        //   order: 14,
        //   show: false,
        // },
        // {
        //   label: "崩坏：星穹铁道",
        //   name: "starrail",
        //   order: 16,
        //   show: false,
        // },
        // {
        //   label: "LOL",
        //   name: "lol",
        //   order: 15,
        //   show: false,
        // },
        // {
        //   label: "网易新闻",
        //   name: "netease-news",
        //   order: 17,
        //   show: false,
        // },
        // {
        //   label: "微信读书",
        //   name: "weread",
        //   order: 18,
        //   show: false,
        // },
        // {
        //   label: "豆瓣讨论小组",
        //   name: "douban-group",
        //   order: 19,
        //   show: false,
        // },
        // {
        //   label: "NGA",
        //   name: "ngabbs",
        //   order: 20,
        //   show: false,
        // },
        // {
        //   label: "HelloGitHub",
        //   name: "hellogithub",
        //   order: 21,
        //   show: false,
        // },
        // {
        //   label: "简书",
        //   name: "jianshu",
        //   order: 22,
        //   show: false,
        // },
        // {
        //   label: "知乎日报",
        //   name: "zhihu_daily",
        //   category: "default",
        //   order: 23,
        //   show: true,
        // },
        // {
        //   label: "BBC",
        //   name: "bbc_news",
        //   category:"default",
        //   order: 24,
        //   show: true,
        // },
        // {
        //   label: "The New York Times",
        //   name: "ny_times",
        //   category: "default",
        //   order: 25,
        //   show: true,
        // },
        // {
        //   label: "GitHub",
        //   name: "github",
        //   category: "default",
        //   order: 26,
        //   show: true,
        // },
        // {
        //   label: "WikiPedia",
        //   name: "wikipedia_history",
        //   category: "en",
        //   order: 27,
        //   show: true,
        // },
        // {
        //   label: "维基百科",
        //   name: "wikipedia_most_read",
        //   category: "zh",
        //   order: 28,
        //   show: true,
        // },
        // {
        //   label: "WikiPedia",
        //   name: "wikipedia_most_read",
        //   category: "en",
        //   order: 28,
        //   show: true,
        // },
        // {
        //   label: "央视新闻",
        //   name: "cctv_news",
        //   category: "default",
        //   order: 29,
        //   show: true,
        // },
      ],
      newsArr: [],
      // 链接跳转方式
      linkOpenType: "href",
      // 页头固定
      headerFixed: false,
      // 时间数据
      timeData: null,
      // 字体大小
      listFontSize: 16,
      mode: "list",
      locale:"zh",
    };
  },
  getters: {},
  actions: {
    toggleLanguage(lang){
      this.locale = lang;
    },
    //切换分页显示和时间线显示
    setMode(val,t){
      $message.info(t("switch.prompt")+`${val === "list" ? t("switch.list") : t("switch.timeline")}`);
      this.mode = val;
    },
    // 更改系统主题
    setSiteTheme(val,t) {
      $message.info(t("switch.prompt")+`${val === "dark" ? t("header.dark") : t("header.light")}`, {
        showIcon: false,
      });
      this.siteTheme = val;
      this.siteThemeAuto = false;
    },
    // 检查更新
    checkNewsUpdate() {
      axios.get('/website/list').then(res => {
        const defaultNewsArr = res.data;
        const mainData = JSON.parse(localStorage.getItem("mainData"));
        let updatedNum = 0;
        if (!mainData) return false;
        console.log("列表尝试更新", defaultNewsArr, this.newsArr);
        // 执行比较并迁移
        if (this.newsArr.length > 0) {
          for (const newItem of defaultNewsArr) {
            const exists = this.newsArr.some(
              (news) => newItem.id === news.id
            );
            console.log(exists)
            if (!exists) {
              console.log("列表有更新：", newItem);
              updatedNum++;
              this.newsArr.push(newItem);
            }
          }
          //如果有newsArr的Item不在defaultNewsArr中，删除newsArr的Item
          for (let i = 0; i < this.newsArr.length; i++) {
            const exists = defaultNewsArr.some(
              (news) => this.newsArr[i].id === news.id
            );
            if (!exists) {
              console.log("列表有删除：", this.newsArr[i]);
              this.newsArr.splice(i, 1);
              i--;
            }
          }
          if (updatedNum) $message.success(`成功更新 ${updatedNum} 个榜单数据`);
        } else {
          console.log("列表无内容，写入默认");
          this.newsArr = defaultNewsArr;
        }
      });
      
      
    },
  },
  persist: [
    {
      storage: localStorage,
      paths: [
        "siteTheme",
        "siteThemeAuto",
        "newsArr",
        "linkOpenType",
        "headerFixed",
        "listFontSize",
        "locale",
      ],
    },
  ],
});
