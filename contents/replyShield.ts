import type { PlasmoCSConfig  } from "plasmo"
import {ReplyShield} from "~shield"
import {Config} from "~config"

export const replyShieldCnfig : PlasmoCSConfig = {
  matches: [
    "*://www.bilibili.com/video/*",
    "*://www.bilibili.com/opus/*"
  ],
  all_frames: true
}


console.log("bilibili-shield-element: 初始化....")
window.addEventListener("load", async () => {
  if(await Config.config.getBool("onReplyShield")){
    await new ReplyShield().start()
  }
})