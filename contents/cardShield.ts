import type { PlasmoCSConfig  } from "plasmo"
import {CardShield} from "~shield/cardShield"

export const cardShieldConfig: PlasmoCSConfig = {
  matches: [
    "*://www.bilibili.com/"
  ],
  all_frames: true
}


window.addEventListener("load", async () => {
  console.log("bilibili-shield-element: 视频卡片屏蔽初始化....")
  await new CardShield().start()
})