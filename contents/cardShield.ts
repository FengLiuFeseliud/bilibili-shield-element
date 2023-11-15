import type { PlasmoCSConfig  } from "plasmo"
import {CardShield} from "~shield"
import {Config} from "~config"

export const cardShieldConfig: PlasmoCSConfig = {
  matches: [
    "*://www.bilibili.com/"
  ],
  all_frames: true
}


console.log("bilibili-shield-element: 初始化....")
window.addEventListener("load", async () => {
  await new CardShield().start()
})