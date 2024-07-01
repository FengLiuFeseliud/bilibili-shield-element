import type { PlasmoCSConfig } from "plasmo"
import { ReplyShield } from "~shield/replyShield"
import { Config } from "~config"

export const replyShieldCnfig: PlasmoCSConfig = {
	matches: [
		"*://www.bilibili.com/video/*",
		"*://www.bilibili.com/opus/*"
	],
	all_frames: true
}

window.addEventListener("load", async () => {
	if (await Config.config.get("onReplyShield", true) ) {
		console.log("bilibili-shield-element: 回复屏蔽初始化....")
		await new ReplyShield().start()
	}
})
