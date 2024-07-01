import { Config } from "config.js"
import { Shield } from "./shield"


enum LiveShieldType {
    NONE = "none",
    AREAMASK = "areamask",
}


class LiveShield extends Shield {
    static Live_DIV_PAHT = ".live-room-app.p-relative"

    getObserverPath() {
        return LiveShield.Live_DIV_PAHT
    }

    async getShieldNodeType(node: HTMLElement): Promise<LiveShieldType> {
        if(node.getElementsByClassName("web-player-module-area-mask").length != 0 && await Config.config.get("areaMaskShield", false)){
            return LiveShieldType.AREAMASK
        }
        return LiveShieldType.NONE
    }

    async shieldNode(node: HTMLElement, shieldType: LiveShieldType): Promise<void> {
        if(shieldType == LiveShieldType.AREAMASK){
            Array.from(node.getElementsByClassName("web-player-module-area-mask")).forEach((item: HTMLElement) => {
                item.style.width = "0px"
                item.style.height = "0px"
            })
        }
    }
}


export {LiveShield}