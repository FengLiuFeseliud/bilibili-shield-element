import {Config} from "config.js"


abstract class Shield{
    protected mutationNode: Element = null
    protected observer: MutationObserver = new MutationObserver((mutationList, _) => { mutationList.forEach(this.mutationForEach) })

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
            childList: true
        })
        console.log("bilibili-shield-element: " + this + " 加载")
    }

    protected async trySetNode(node: HTMLElement){
        if(node.nodeType != node.ELEMENT_NODE){
            return
        }
        
        try{
            var shieldNodeTpye = await this.getShieldNodeType(node)
            if(shieldNodeTpye != "none"){
                await this.shieldNode(node, shieldNodeTpye)
            }
        } catch(e){
            console.error(e)
            return
        }
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


enum ReplyShieldType{
    NONE = "none",
    SAILING = "装扮勋章",
    AVATAR_FRAME = "头像框",
    EMOJI = "表情",
    EMOJI_SMALL = "小表情",
    USER_LEVEL = "用户等级",
    USER_ID = "用户 UID",
    KEY_WORD = "关键词"
}


class ReplyShield extends Shield{
    static REPLY_DIV_PAHT = ".reply-list"

    getObserverPath() {
        return ReplyShield.REPLY_DIV_PAHT;
    }

    async getShieldNodeType(node: HTMLElement): Promise<ReplyShieldType> {
        var nodeTest: HTMLCollectionOf<Element>

        nodeTest = node.getElementsByClassName("user-sailing-img")
        if(await Config.config.nodeAttributeInConfigList(nodeTest, "sailingShieldList", (config, node) => config == node.getAttribute("src")) 
                || (nodeTest.length != 0 && await Config.config.getBool("sailingAllShield"))){
            return ReplyShieldType.SAILING
        }

        nodeTest = node.getElementsByClassName("bili-avatar-pendent-dom")
        if(await Config.config.nodeAttributeInConfigList(nodeTest, "avatarFrameShieldList", (config, node) => config == node.getElementsByClassName("bili-avatar-img").item(0).getAttribute("data-src"))
                || (nodeTest.length != 0 && await Config.config.getBool("avatarFrameAllShield"))){
            return ReplyShieldType.AVATAR_FRAME
        }
        
        var rootReplyNode = <HTMLElement>node.getElementsByClassName("root-reply-container").item(0)
        
        nodeTest = rootReplyNode.getElementsByClassName("emoji-large")
        if(await Config.config.nodeAttributeInConfigList(nodeTest, "emojiShieldList", (config, node) => config == node.getAttribute("src"))
                || (nodeTest.length != 0 && await Config.config.getBool("emojiAllShield"))){
            return ReplyShieldType.EMOJI
        }

        nodeTest = rootReplyNode.getElementsByClassName("emoji-small")
        if(await Config.config.nodeAttributeInConfigList(nodeTest, "emojiSmallShieldList", (config, node) => config == node.getAttribute("src"))
                || (nodeTest.length != 0 && await Config.config.getBool("emojiSmallAllShield"))){
            return ReplyShieldType.EMOJI_SMALL
        }
        
        for(let index = 0; index < await Config.config.getInt("userLevelShield"); index++){
            if(node.getElementsByClassName("user-info").item(0).getElementsByClassName("level-" + index).length != 0){
                return ReplyShieldType.USER_LEVEL
            }
        }
        
        var userIdConfig = await Config.config.getInt("userIdShield")
        if(Number(node.getElementsByClassName("root-reply-avatar").item(0).getAttribute("data-user-id")) > userIdConfig && userIdConfig > 0){
            return ReplyShieldType.USER_ID
        }

        nodeTest = rootReplyNode.getElementsByClassName("reply-content")
        if(await Config.config.nodeAttributeInConfigList(nodeTest, "keyWordsShieldList", (config: string, node) => node.innerText.indexOf(config) != -1)){
            return ReplyShieldType.KEY_WORD
        }

        return ReplyShieldType.NONE
    }

    async shieldNode(node: HTMLElement, shieldTpye: ReplyShieldType): Promise<void> {
        var rootReplyNode = <HTMLElement>node.getElementsByClassName("root-reply-container").item(0)
        if(!(await Config.config.getBool("shieldInfo"))){
            if(await Config.config.getBool("rootAndSubReplyShield")){
                (<HTMLElement>node.getElementsByClassName("sub-reply-container").item(0)).style.display = 'none';
                (<HTMLElement>node.getElementsByClassName("bottom-line").item(0)).style.display = 'none'
            }
            rootReplyNode.style.display = 'none'
            return
        }

        var shieldInfo = <HTMLElement>document.createElement('dir')
        node.insertBefore(shieldInfo, rootReplyNode)

        shieldInfo.appendChild(document.createTextNode("屏蔽了一条评论, 屏蔽类型: " + shieldTpye))
        shieldInfo.style.fontSize = "14px"
        shieldInfo.style.paddingLeft = "82px"
        
        var shieldSet = document.createElement('a')
        shieldInfo.appendChild(shieldSet)
        shieldSet.style.paddingLeft = "5px"

        shieldSet.innerHTML = "展开"
        if(await Config.config.getBool("rootAndSubReplyShield")){
            var subReplyNode = <HTMLElement>node.getElementsByClassName("sub-reply-container").item(0)
            shieldSet.onclick = function(){
                if(rootReplyNode.style.display == 'none'){
                    rootReplyNode.style.display = 'block'
                    subReplyNode.style.display = 'block'
                    shieldSet.innerHTML = "收起"
                } else {
                    rootReplyNode.style.display = 'none'
                    subReplyNode.style.display = 'none'
                    shieldSet.innerHTML = "展开"
                }
            }
            subReplyNode.style.display = 'none'
        
        } else {
            shieldSet.onclick = function(){
                if(rootReplyNode.style.display == 'none'){
                    rootReplyNode.style.display = 'block'
                    shieldSet.innerHTML = "收起"
                } else {
                    rootReplyNode.style.display = 'none'
                    shieldSet.innerHTML = "展开"
                }
            }
        }
        rootReplyNode.style.display = 'none'
    }
}


export {ReplyShield}