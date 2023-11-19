import {Config} from "config.js"


abstract class Shield{
    protected mutationNode: Element = null
    protected observer: MutationObserver = new MutationObserver((mutationList, _) => { mutationList.forEach(this.mutationForEach) })

    private allNodeSize: number = 0
    private nodeShieldSize: number = 0

    // 我第一次弄过 ts 这箭头竟然要拆出来?? 怪
    private mutationForEach = async (mutation: MutationRecord) => {
        mutation.addedNodes.forEach(async (node: HTMLElement) => {
            await this.trySetNode(node)
        })
    }

    /**
     * 启动屏蔽器监听
     */
    public async start(): Promise<void>{
        while(this.mutationNode == null){
            await new Promise((res, re) => {
                setTimeout(res, 1000)
            })
            this.mutationNode = document.querySelector(this.getObserverPath())
        }

        if(this.mutationNode.childNodes.length != 0){
            this.mutationNode.childNodes.forEach(async (node: HTMLElement) => {
                await this.trySetNode(node)
            })
        }

        this.observer.observe(this.mutationNode, {
            childList: true,
            subtree: true
        })
        console.log("bilibili-shield-element: " + this + " 加载")
    }

    protected async trySetNode(node: HTMLElement){
        if(node.nodeType != node.ELEMENT_NODE){
            return
        }
        
        this.allNodeSize ++
        try{
            if(!(await this.canPassShield(node))){
                return
            }
            
            await this.resetNode(node)
            var shieldNodeTpye = await this.getShieldNodeType(node)
            if(shieldNodeTpye != "none"){
                this.nodeShieldSize ++
                await this.shieldNode(node, shieldNodeTpye)
            }
        } catch(e){
            return
        }
    }

    protected async canPassShield(node: HTMLElement): Promise<boolean>{
        return true;
    }

    protected async resetNode(node: HTMLElement): Promise<void>{

    }

    /**
     * 获取监听节点路径
     */
    abstract getObserverPath(): any

    /**
     * 是否可以屏蔽节点
     * @param node 新节点
     */
    abstract getShieldNodeType(node: HTMLElement): Promise<string>

    /**
     * 屏蔽节点
     * @param node 需屏蔽节点
     */
    abstract shieldNode(node: HTMLElement, shieldType: string): Promise<void>
}

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


export {Shield, CardShield} 