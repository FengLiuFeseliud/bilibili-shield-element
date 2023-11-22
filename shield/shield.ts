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


export {Shield} 