import { Config } from "config.js"
import { Shield } from "./shield"


enum ReplyShieldType{
    NONE = "none",
    SAILING = "装扮勋章",
    AVATAR_FRAME = "头像框",
    EMOJI = "表情",
    EMOJI_SMALL = "小表情",
    USER_LEVEL = "用户等级",
    USER_ID = "用户 UID",
    KEY_WORD = "关键词",
    REGULAR = "正则匹配",
    JUMP_LINK_SEARCH = "跳转搜索",
    JUMP_LINK_NORMAL = "跳转链接"
}

class ReplyShield extends Shield {
    static REPLY_DIV_PAHT = ".reply-list"

    getObserverPath() {
        return ReplyShield.REPLY_DIV_PAHT
    }
    
    protected async resetNode(node: HTMLElement): Promise<void> {
        var subNodes = node.getElementsByClassName("sub-reply-item")
        for(var index = 0; index < subNodes.length; index ++){
            await this.trySetNode(<HTMLElement>subNodes.item(index))
        }
    }

    protected async canPassShield(node: HTMLElement): Promise<boolean> {
        var className = node.getAttribute("class")
        return className == "reply-item" || className == "sub-reply-item";
    }

    async getShieldSubNodeType(node: HTMLElement): Promise<ReplyShieldType>{
        if(!(await Config.config.get("onSubReplyShield", true))){
            return ReplyShieldType.NONE
        }
        var nodeTest: HTMLCollectionOf<Element>

        nodeTest = node.getElementsByClassName("emoji-large")
        if (await Config.config.nodeAttributeInConfigList(nodeTest, "emojiShieldList", (config, node) => config == node.getAttribute("src"))
            || (nodeTest.length != 0 && await Config.config.get("emojiAllShield", false))) {
            return ReplyShieldType.EMOJI
        }

        nodeTest = node.getElementsByClassName("emoji-small")
        if (await Config.config.nodeAttributeInConfigList(nodeTest, "emojiSmallShieldList", (config, node) => config == node.getAttribute("src"))
            || (nodeTest.length != 0 && await Config.config.get("emojiSmallAllShield", false))) {
            return ReplyShieldType.EMOJI_SMALL
        }
        
        for (let index = 0; index < await Config.config.get("userLevelShield", -1); index++) {
            if (node.querySelector(".sub-user-info > i").getAttribute("class").indexOf("level-" + index) != -1) {
                return ReplyShieldType.USER_LEVEL
            }
        }

        var userIdConfig = await Config.config.get("userIdShield", 0)
        if (Number(node.querySelector(".sub-reply-avatar").getAttribute("data-user-id")) > userIdConfig && userIdConfig > 0) {
            return ReplyShieldType.USER_ID
        }

        nodeTest = node.getElementsByClassName("reply-content")
        if (await Config.config.nodeAttributeInConfigList(nodeTest, "keyWordsShieldList", (config: string, node) => node.innerText.indexOf(config) != -1 && config != "")) {
            return ReplyShieldType.KEY_WORD
        }

        if (nodeTest.item(0).innerHTML.search(await Config.config.get("regularShieldList", ""))) {
            return ReplyShieldType.REGULAR
        }

        if (await Config.config.get("jumpSearchShield", false)) {
            if ((<HTMLElement>nodeTest.item(0)).querySelector(".jump-link.search-word") != null) {
                return ReplyShieldType.JUMP_LINK_SEARCH
            }
        }

        if (await Config.config.get("jumpNormalShield", false)) {
            if ((<HTMLElement>nodeTest.item(0)).querySelector(".jump-link.normal") != null) {
                return ReplyShieldType.JUMP_LINK_NORMAL
            }
        }

        return ReplyShieldType.NONE
    }

    async getShieldNodeType(node: HTMLElement): Promise<ReplyShieldType> {
        if (node.getAttribute("class") == "sub-reply-item"){
            return await this.getShieldSubNodeType(node) 
        }
        var nodeTest: HTMLCollectionOf<Element>

        nodeTest = node.getElementsByClassName("user-sailing-img")
        if (await Config.config.nodeAttributeInConfigList(nodeTest, "sailingShieldList", (config, node) => config == node.getAttribute("src"))
            || (nodeTest.length != 0 && await Config.config.get("sailingAllShield", false))) {
            return ReplyShieldType.SAILING
        }

        nodeTest = node.getElementsByClassName("bili-avatar-pendent-dom")      
        if (await Config.config.nodeAttributeInConfigList(nodeTest, "avatarFrameShieldList", (config, node) => config == node.getElementsByClassName("bili-avatar-img").item(0).getAttribute("data-src"))
            || (nodeTest.length != 0 && await Config.config.get("avatarFrameAllShield", false))) {
            return ReplyShieldType.AVATAR_FRAME
        }

        var rootReplyNode = <HTMLElement>node.querySelector(".root-reply-container")

        nodeTest = rootReplyNode.getElementsByClassName("emoji-large")
        if (await Config.config.nodeAttributeInConfigList(nodeTest, "emojiShieldList", (config, node) => config == node.getAttribute("src"))
            || (nodeTest.length != 0 && await Config.config.get("emojiAllShield", false))) {
            return ReplyShieldType.EMOJI
        }

        nodeTest = rootReplyNode.getElementsByClassName("emoji-small")
        if (await Config.config.nodeAttributeInConfigList(nodeTest, "emojiSmallShieldList", (config, node) => config == node.getAttribute("src"))
            || (nodeTest.length != 0 && await Config.config.get("emojiSmallAllShield", false))) {
            return ReplyShieldType.EMOJI_SMALL
        }

        for (let index = 0; index < await Config.config.get("userLevelShield", -1); index++) {
            if (node.getElementsByClassName("user-info").item(0).getElementsByClassName("level-" + index).length != 0) {
                return ReplyShieldType.USER_LEVEL
            }
        }

        var userIdConfig = await Config.config.get("userIdShield", 0)
        if (Number(node.querySelector(".root-reply-avatar").getAttribute("data-user-id")) > userIdConfig && userIdConfig > 0) {
            return ReplyShieldType.USER_ID
        }

        nodeTest = rootReplyNode.getElementsByClassName("reply-content")
        if (await Config.config.nodeAttributeInConfigList(nodeTest, "keyWordsShieldList", (config: string, node) => node.innerText.indexOf(config) != -1 && config != "")) {
            return ReplyShieldType.KEY_WORD
        }

        if (nodeTest.item(0).innerHTML.search(await Config.config.get("regularShieldList", ""))) {
            return ReplyShieldType.REGULAR
        }

        if (await Config.config.get("jumpSearchShield", false)) {
            if ((<HTMLElement>nodeTest.item(0)).querySelector(".jump-link.search-word") != null) {
                return ReplyShieldType.JUMP_LINK_SEARCH
            }
        }

        if (await Config.config.get("jumpNormalShield", false)) {
            if ((<HTMLElement>nodeTest.item(0)).querySelector(".jump-link.normal") != null) {
                return ReplyShieldType.JUMP_LINK_NORMAL
            }
        }

        return ReplyShieldType.NONE
    }

    private insertShieldInfo(node: HTMLElement, msg: string, setClick: (a: HTMLElement) => void): HTMLElement{
        var shieldInfo = <HTMLElement>document.createElement('div')
        node.parentElement.insertBefore(shieldInfo, node)

        shieldInfo.appendChild(document.createTextNode(msg))
        shieldInfo.style.fontSize = "14px"
        
        var shieldSet = document.createElement('a')
        shieldInfo.appendChild(shieldSet)
        shieldSet.style.paddingLeft = "5px"

        shieldSet.innerHTML = "展开"
        setClick(shieldSet)
        return shieldInfo
    }

    async shieldSubNode(node: HTMLElement, shieldTpye: ReplyShieldType): Promise<void> {
        if(!(await Config.config.get("subShieldInfo", true))){
            node.style.display = 'none'
            return
        }
        var subUserInfoNode = <HTMLElement>node.querySelector(".sub-user-info")
        var subReplyContentNode = <HTMLElement>node.querySelector(".sub-reply-content")
        var subReplyInfoNode = <HTMLElement>node.querySelector(".sub-reply-info")

        this.insertShieldInfo(subUserInfoNode, "屏蔽了一条评论, 屏蔽类型: " + shieldTpye, (a) => {
            subUserInfoNode.style.display = 'none'
            subReplyContentNode.style.display = 'none'
            subReplyInfoNode.style.display = 'none'

            a.onclick = function(){
                if(subUserInfoNode.style.display == 'none'){
                    subUserInfoNode.style.display = 'inline-flex'
                    subReplyContentNode.style.display = 'inline'
                    subReplyInfoNode.style.display = 'flex'
                    a.innerHTML = "收起"
                } else {
                    subUserInfoNode.style.display = 'none'
                    subReplyContentNode.style.display = 'none'
                    subReplyInfoNode.style.display = 'none'
                    a.innerHTML = "展开"
                }
            }
        })
    }

    async shieldNode(node: HTMLElement, shieldTpye: ReplyShieldType): Promise<void> {
        if(node.getAttribute("class") == "sub-reply-item"){
            return await this.shieldSubNode(node, shieldTpye)
        } 

        var rootReplyNode = <HTMLElement>node.querySelector(".root-reply-container")
        if(!(await Config.config.get("shieldInfo", true))){
            if(await Config.config.get("rootAndSubReplyShield", true)){
                (<HTMLElement>node.querySelector(".sub-reply-container")).style.display = 'none';
                (<HTMLElement>node.querySelector(".bottom-line")).style.display = 'none'
            }
            rootReplyNode.style.display = 'none'
            return
        }

        var info = this.insertShieldInfo(rootReplyNode, "屏蔽了一条评论, 屏蔽类型: " + shieldTpye, async (a) => {
            if(await Config.config.get("rootAndSubReplyShield", true)){
                var subReplyNode = <HTMLElement>node.querySelector(".sub-reply-container")
                a.onclick = function(){
                    if(rootReplyNode.style.display == 'none'){
                        rootReplyNode.style.display = 'block'
                        subReplyNode.style.display = 'block'
                        a.innerHTML = "收起"
                    } else {
                        rootReplyNode.style.display = 'none'
                        subReplyNode.style.display = 'none'
                        a.innerHTML = "展开"
                    }
                }
                subReplyNode.style.display = 'none'
            
            } else {
                a.onclick = function(){
                    if(rootReplyNode.style.display == 'none'){
                        rootReplyNode.style.display = 'block'
                        a.innerHTML = "收起"
                    } else {
                        rootReplyNode.style.display = 'none'
                        a.innerHTML = "展开"
                    }
                }
            }
        })
        
        info.style.paddingLeft = "82px"
        info.style.paddingTop = "14px"
        rootReplyNode.style.display = 'none'
    }
}

export {ReplyShieldType, ReplyShield}