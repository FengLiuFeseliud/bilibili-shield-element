import type { PlasmoCSConfig } from "plasmo"
import { LiveShield } from "~shield/liveShield"
import { Config } from "~config"

export const replyShieldCnfig: PlasmoCSConfig = {
	matches: [
		"*://live.bilibili.com/*",
	],
	all_frames: true
}

window.addEventListener("load", async () => {
    console.log("bilibili-shield-element: 直播屏蔽初始化....")

	await new LiveShield().start()
})
