
export default{
    header: {
        title: '今日热榜',
        desc: '掌握全球热点，定制你的专属资讯源',
        loadingTime:"时间获取中",
        rss:{
            add:"添加RSS订阅链接",
            placeholder:"请输入RSS订阅链接",
            success:"新增订阅成功",
            error:"新增订阅失败"
        },
        addUrl:"添加订阅源",
        switchLanguage:"Switch to English",
        switchMode:"切换模式",
        refresh:"刷新",
        setting:"设置",
        add:"添加",
        cancel:"取消",
        dark:"深色模式",
        light:"浅色模式",
        error:{
            time:"时间获取失败",
            date:"日期获取失败",
        }
    },
    home:{
        tip:"点击右上角设置按钮，可以添加RSS订阅链接，开始添加你的第一个订阅吧",
        reset:{
            prompt:"出错了？点此重置",
            resetTitle:"重置站点",
            resetContent:"重置站点将清空所有订阅，是否继续？",
            confirm:"重置",
            cancel:"取消",

        },
        
    },
    hotList:{
        error:{
            title:"哎呀，加载失败了",
            desc:"生活总会遇到不如意的事情",
            loading:"热榜加载失败，请重试"
        },
        dialog:{
            title:"提示",
            content:"取消订阅",
            confirm:"确定",
            cancel:"取消",
            success:"取消订阅成功",
            fail:"取消订阅失败",
        },
        info:{
            loading:"正在更新，请稍后",
            tryLater:"请稍后再刷新",
            
        },
        retry:"重试",
        timeFail:"获取失败",
        unsubscribe:"取消订阅",
        more:"查看更多",
        refresh:"获取最新",
    },
    list:{
        linkError:"链接不存在",
    },
    settings: {
        title: "全局设置",
        basicSettings: "基础设置",
        theme: {
          lightDarkMode: "明暗模式",
          autoFollowSystem: "明暗模式跟随系统",
          tipAutoFollowSystem: "明暗模式是否跟随系统当前模式",
        },
        linkOpenType: {
          title: "链接跳转方式",
          tip: "选择榜单列表内容的跳转方式",
          new:"新窗口打开",
          current:"当前窗口打开",
        },
        listTextSize: {
          title: "列表文本大小",
          tip: "我是将要显示的文字的大小",
          smaller:"小一点",
          default:"默认",
          larger:"大一点",
        },
        sort: {
          title: "榜单设置",
          tip: "开启榜单排序",
        },
        miscellaneous:"杂项设置",
        reset: {
          title: "重置所有数据",
          tip: "重置所有数据，你的自定义设置都将会丢失",
          confirm: "确认重置所有数据？你的自定义设置都将会丢失！",
          buttonText:"重置",

        },
        messages: {
            sortEnabled: "榜单排序已开启,请拖动榜单进行排序",
            sortDisabled: "榜单排序已关闭",
            themeAutoFollow: "开启明暗模式跟随系统",
            restoreDefaultSort: "恢复默认榜单排序成功",
            sortSuccess: "榜单排序成功",
            success:"成功",
            fail:"失败",
            sortToggle: `{name}排序已{status}`,
          }, 
      },
      time: {
        justUpdated: "刚刚更新",
        minutesAgo: "最新记录: {minutes}分钟前",
        hoursAgo: "最新记录: {hours}小时前",
        specificDate: "{month}月{day}日",
        currentTime: "{year}年{month}月{day}日 {hour}:{minute}:{second} {weekday}",
        weekday: '星期日,星期一,星期二, 星期三, 星期四,星期五,星期六',
      },
      switch:{
        prompt:"已切换至 ",
        list:"列表模式",
        timeline:"时间线模式",
    }

}