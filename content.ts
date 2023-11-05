import type { PlasmoContentScript } from "plasmo"
import {ReplyShield} from "~shield"
import {Config} from "~config"

export const config: PlasmoContentScript = {
  matches: [
    "*://www.bilibili.com/video/*",
    "*://www.bilibili.com/opus/*"
  ],
  all_frames: true
}


console.log("bilibili-shield-element: 初始化....")
window.onload = async function(){
    if(await Config.config.getBool("onReplyShield")){
        new ReplyShield().start()
    }
}

