import { Config } from "~config"
import { Shield } from "./shield"


enum CaedShieldType {
    NONE = "none",
    CAROUSEL = "carousel",
    ADVERTISE = "advertise",
    SINGLE_CARD = "single-card",
    REGULAR = "regular"
}


class CardShield extends Shield{
    static CARD_DIV_PAHT = ".container.is-version8"

    getObserverPath() {
        return CardShield.CARD_DIV_PAHT
    }

    async getShieldNodeType(node: HTMLElement): Promise<CaedShieldType> {
        var className = node.getAttribute("class")
        if(await Config.config.get("homePageCarouselShield", false) && className == "recommended-swipe grid-anchor"){
            if(className == "recommended-swipe grid-anchor"){
                return CaedShieldType.CAROUSEL
            }
        }

        if(await Config.config.get("advertiseShield", false)){
            if(node.getElementsByClassName("bili-video-card__info--ad").length != 0){
                return CaedShieldType.ADVERTISE
            }
        }

        if(await Config.config.get("floatCardShield", false)){
            if(className.indexOf("single-card") != -1){
                return CaedShieldType.SINGLE_CARD
            }
        }

        var nodeTest: HTMLCollectionOf<Element>
        if(node.getElementsByClassName("loading_animation").length != 0 || className.indexOf("load-more-anchor") != -1){
            return CaedShieldType.NONE
        }

        if(className.indexOf("single-card") == -1){
            nodeTest = node.getElementsByClassName("bili-video-card__info--tit")
            var cardRegularShieldList: string = await Config.config.get("cardRegularShieldList", "")
            if(nodeTest.item(0).getAttribute("title").search(cardRegularShieldList) != -1 && cardRegularShieldList != ""){
                return CaedShieldType.REGULAR
            }
        } else {
            nodeTest = node.getElementsByClassName("title")
            var cardRegularShieldList: string = await Config.config.get("cardRegularShieldList", "")
            if(nodeTest.item(0).getAttribute("title").search(cardRegularShieldList) != -1 && cardRegularShieldList != ""){
                return CaedShieldType.REGULAR
            }
        }

        var nodeq = node.querySelector(".bili-video-card__info--icon-text")
        if(nodeq != null){
            var iconText = nodeq.innerHTML
            if(iconText.indexOf("点赞") != -1 && await Config.config.get("likeCardShield", false)){
                return CaedShieldType.REGULAR
            }

            if(iconText.indexOf("已关注") != -1 && await Config.config.get("subscriptionCardShield", false)){
                return CaedShieldType.REGULAR
            }
        }
        
        return CaedShieldType.NONE
    }

    async shieldNode(node: HTMLElement, shieldType: CaedShieldType): Promise<void> {
        if(shieldType == CaedShieldType.CAROUSEL){
            node.style.display = "none"
            return
        }

        node.style.display = "none"
    }
}


export {CardShield} 