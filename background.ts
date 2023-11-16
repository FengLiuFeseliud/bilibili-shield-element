import {Config} from "~config"

export {}

chrome.contextMenus.create({
    type: 'normal',
    title: '按右键处屏蔽',
    id: 'shieldSet',
    contexts: ["image"],
    documentUrlPatterns: [
        '*://www.bilibili.com/*',
        "*://www.bilibili.com/video/*",
        "*://www.bilibili.com/opus/*"
    ]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    Config.config.set("srcUrl", info.srcUrl)
    chrome.tabs.create({
        url: `chrome-extension://${chrome.runtime.id}/options.html`
    })
})