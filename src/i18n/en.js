export default {
    header: {
        title: 'Hot List Today',
        desc: 'Stay updated with global hotspots and customize your news sources',
        loadingTime: "Loading time",
        rss: {
            add: "Add RSS Subscription Link",
            placeholder: "Enter RSS subscription link",
            success: "Subscription added successfully",
            error: "Failed to add subscription"
        },
        addUrl: "Add Subscription Source",
        switchMode: "Switch Mode",
        refresh: "Refresh",
        setting: "Settings",
        add: "Add",
        cancel: "Cancel",
        dark: "Dark Mode",
        light: "Light Mode",
        switchLanguage:"切换至中文",
        error: {
            time: "Failed to fetch time",
            date: "Failed to fetch date",
        }
    },
    home: {
        tip: "Click the settings button in the top right corner to add an RSS subscription link and start adding your first subscription",
        reset: {
            prompt: "Something went wrong? Click here to reset",
            resetTitle: "Reset Site",
            resetContent: "Resetting the site will clear all subscriptions. Are you sure you want to continue?",
            confirm: "Reset",
            cancel: "Cancel",
        },
    },
    hotList: {
        error: {
            title: "Oops, loading failed",
            desc: "Life always has its ups and downs",
            loading: "Failed to load the hot list. Please try again"
        },
        dialog: {
            title: "Reminder",
            content: "Unsubscribe",
            confirm: "Confirm",
            cancel: "Cancel",
            success: "Unsubscribed successfully",
            fail: "Failed to unsubscribe",
        },
        info: {
            loading: "Updating, please wait",
            tryLater: "Please refresh later",
        },
        retry: "Retry",
        timeFail: "Failed to fetch",
        unsubscribe: "Unsubscribe",
        more: "View More",
        refresh: "Get Latest",
    },
    list: {
        linkError: "Link does not exist",
    },
    settings: {
        title: "Global Settings",
        basicSettings: "Basic Settings",
        theme: {
            lightDarkMode: "Light/Dark Mode",
            autoFollowSystem: "Follow System Theme",
            tipAutoFollowSystem: "Whether the light/dark mode follows the system's current theme",
        },
        linkOpenType: {
            title: "Link Opening Method",
            tip: "Choose how to open the content of the list",
            new: "New Window",
            current: "Current Window",
        },
        listTextSize: {
            title: "List Text Size",
            tip: "Size of the text displayed",
            smaller: "Smaller",
            default: "Default",
            larger: "Larger",
        },
        sort: {
            title: "List Settings",
            tip: "Enable sorting",
        },
        miscellaneous: "Miscellaneous Settings",
        reset: {
            title: "Reset All Data",
            tip: "Resetting all data will lose your custom settings",
            confirm: "Confirm to reset all data? Your custom settings will be lost!",
            buttonText: "Reset",
        },
        messages: {
            sortEnabled: "List sorting has been enabled, please drag the list to sort",
            sortDisabled: "List sorting has been disabled",
            themeAutoFollow: "Follow system theme enabled",
            restoreDefaultSort: "Successfully restored default list sorting",
            sortSuccess: "List sorted successfully",
            success: "turned on",
            fail: "turned off",
            sortToggle: `{name} is {status}`,
        },
    },
    time: {
        justUpdated: "Just Updated",
        minutesAgo: "Latest record: {minutes} mins ago",
        hoursAgo: "Latest record: {hours} hours ago",
        specificDate: "{month}/{day}",
        currentTime: "{year}-{month}-{day} {hour}:{minute}:{second} {weekday}",
        weekday: 'Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday',
    },
    switch:{
        prompt:"Switched to ",
        list:"List Mode",
        timeline:"Timeline Mode",
    }
}
