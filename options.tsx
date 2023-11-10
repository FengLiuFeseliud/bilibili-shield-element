import { useStorage } from "@plasmohq/storage/hook"
import style from "~scss/options.module.scss"
import githubIcon from "react:~icon/github.svg"
import bilibiliIcon from "react:~icon/bilibili.svg"


function getTextareaValue(look: string): string{
    return String(look).split(",").join("\n")
}


function setTextareaValue(look: string, setValue: (setter: any) => Promise<void>){
    setValue(String(look).split("\n"))
}

function setKeyWordsShieldListValue(look: string, setValue: (setter: any) => Promise<void>){
    setValue(String(look).split("\n").join().split(","))
}


function options() {
    // 屏蔽显示
    const [lookShieldInfo, setShieldInfo] = useStorage("shieldInfo")
    const [lookRootAndSubReplyShield, setRootAndSubReplyShield] = useStorage("rootAndSubReplyShield")

    // 视频卡屏蔽
    const [lookHomePageCarouselShield, setHomePageCarouselShield] = useStorage("homePageCarouselShield")
    const [lookAdvertiseShield, setAdvertiseShield] = useStorage("advertiseShield")
    const [lookFloatCardShield, setFloatCardShield] = useStorage("floatCardShield")

    // 评论屏蔽
    const [lookOnReplyShield, setOnReplyShield] = useStorage("onReplyShield")
    const [lookUserIdShield, setUserIdShield] = useStorage("userIdShield")
    const [lookUserLevelShield, setUserLevelShield] = useStorage("userLevelShield")
    const [lookJumpSearchShield, setJumpSearchShield] = useStorage("jumpSearchShield")
    const [lookJumpNormalShield, setJumpNormalShield] = useStorage("jumpNormalShield")
    const [lookSailingAllShield, setSailingAllShield] = useStorage("sailingAllShield")
    const [lookSailingShieldList, setSailingShieldList] = useStorage("sailingShieldList")
    const [lookAvatarFrameAllShield, setAvatarFrameAllShield] = useStorage("avatarFrameAllShield")
    const [lookAvatarFrameShieldList, setAvatarFrameShieldList] = useStorage("avatarFrameShieldList")
    const [lookEmojiAllShield, setEmojiAllShield] = useStorage("emojiAllShield")
    const [lookEmojiShieldList, setEmojiShieldList] = useStorage("emojiShieldList")
    const [lookEmojiSmallAllShield, setEmojiSmallAllShield] = useStorage("emojiSmallAllShield")
    const [lookEmojiSmallShieldList, setEmojiSmallShieldList] = useStorage("emojiSmallShieldList")
    const [lookKeyWordsShieldList, setKeyWordsShieldList] = useStorage("keyWordsShieldList")
    const [lookRegularShieldList, setRegularShieldList] = useStorage("regularShieldList")

    // 配置菜单
    const [lookBackgroundUrl, setBackgroundUrl] = useStorage("backgroundUrl")

    return (
        <div className={style.body} style={{backgroundImage: "url("+lookBackgroundUrl+")"}}><div className={style.cover}>
            <div className={style.title}>
                <span className={style.name}><span>Bilibili</span> Shield Element</span><span className={style.version}>0.2.0</span>
                <a href="https://github.com/FengLiuFeseliud/bilibili-shield-element">{githubIcon(null)}</a>
                <a href="https://space.bilibili.com/34394509">{bilibiliIcon(null)}</a>
                <hr></hr>
            </div>

            <div className={style.config}>
                <h1>屏蔽显示</h1>
                <div className={style["config-item"]}>
                    <label htmlFor="shieldInfo">
                        <span>屏蔽评论后显示屏蔽信息</span>
                        <span className={style["config-item-sub-info"]}>屏蔽评论后, 原区域显示屏蔽信息, 并可以控制屏蔽评论是否显示, true 显示</span>
                    </label>
                    <select id="shieldInfo" value={lookShieldInfo} onChange={(e) => setShieldInfo(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="rootAndSubReplyShield">
                        <span>屏蔽楼评论后不显示楼回复</span>
                        <span className={style["config-item-sub-info"]}>屏蔽楼评论后, 评论下面的楼回复一起屏蔽, true 启动屏蔽</span>
                    </label>
                    <select id="rootAndSubReplyShield" value={lookRootAndSubReplyShield} onChange={(e) => setRootAndSubReplyShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <hr></hr>

                <h1>视频卡屏蔽</h1>
                <div className={style["config-item"]}>
                    <label htmlFor="homePageCarouselShield">
                        <span>主页轮播图屏蔽</span>
                        <span className={style["config-item-sub-info"]}>屏蔽主页轮播图, 轮播图为主页变化大图, true 启动屏蔽</span>
                    </label>
                    <select id="homePageCarouselShield" value={lookHomePageCarouselShield} onChange={(e) => setHomePageCarouselShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="advertiseShield">
                        <span>视频卡广告屏蔽</span>
                        <span className={style["config-item-sub-info"]}>屏蔽视频卡广告, 如视频卡广告为一块视频区域文字中有广告图标, true 启动屏蔽</span>
                    </label>
                    <select id="advertiseShield" value={lookAdvertiseShield} onChange={(e) => setAdvertiseShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                
                <div className={style["config-item"]}>
                    <label htmlFor="floatCardShield">
                        <span>浮动视频卡屏蔽</span>
                        <span className={style["config-item-sub-info"]}>屏蔽浮动视频卡, 如视频卡旁边有阴影, true 启动屏蔽</span>
                    </label>
                    <select id="floatCardShield" value={lookFloatCardShield} onChange={(e) => setFloatCardShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <hr></hr>

                <h1>评论屏蔽</h1>
                <div className={style["config-item"]}>
                    <label htmlFor="onReplyShield">
                        <span>启用评论屏蔽</span>
                        <span className={style["config-item-sub-info"]}>控制 Bilibili shield element 是否屏蔽评论, true 启动屏蔽</span>
                    </label>
                    <select id="onReplyShield" value={lookOnReplyShield} onChange={(e) => setOnReplyShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="userLevelShield">
                        <span>按用户等级屏蔽评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽指定等级以下的所有评论, 值为 0 以下时关闭</span>
                    </label>
                    <input id="userLevelShield" type="text" value={lookUserLevelShield} onChange={(e) => setUserLevelShield(e.target.value)}/>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="userIdShield">
                        <span>按用户 uid 屏蔽评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽指定 uid 以上的所有评论, 值为 0 时关闭</span>
                    </label>
                    <input id="userIdShield" type="text" value={lookUserIdShield} onChange={(e) => setUserIdShield(e.target.value)}/>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="jumpSearchShield">
                        <span>屏蔽有搜索跳转的评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽有搜索跳转的评论, 如什么什么后面跟搜索的蓝色链接, true 启动屏蔽</span>
                    </label>
                    <select id="jumpSearchShield" value={lookJumpSearchShield} onChange={(e) => setJumpSearchShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="jumpNormalShiel">
                        <span>屏蔽有外部跳转的评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽有外部跳转的评论, 如什么什么前面淘宝/京东的蓝色链接, true 启动屏蔽</span>
                    </label>
                    <select id="jumpNormalShiel" value={lookJumpNormalShield} onChange={(e) => setJumpNormalShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                
                <div className={style["config-item"]}>
                    <label htmlFor="emojiAllShield">
                        <span>屏蔽有表情的所有评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽所有有表情的评论, 如大号黄豆的表情, true 启动屏蔽</span>
                    </label>
                    <select id="emojiAllShield" value={lookEmojiAllShield} onChange={(e) => setEmojiAllShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="emojiShieldList">
                        <span>按表情屏蔽评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽指定表情的所有评论, 如大号黄豆的表情, 检测表情图片链接, 换行添加多个表情</span>
                    </label>
                    <textarea 
                        id="emojiShieldList" 
                        value={getTextareaValue(lookEmojiShieldList)} 
                        onChange={(e) => setTextareaValue(e.target.value, setEmojiShieldList)}
                    ></textarea>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="emojiSmallAllShield">
                        <span>屏蔽有小表情的所有评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽所有有小表情的评论, 如B站狗头, true 启动屏蔽</span>
                    </label>
                    <select id="emojiSmallAllShield" value={lookEmojiSmallAllShield} onChange={(e) => setEmojiSmallAllShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="emojiSmallShieldList">
                        <span>按小表情屏蔽评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽指定表情的所有评论, 如B站狗头, 检测表情图片链接(ps: 屏蔽自带 emoji 请使用关键词屏蔽), 换行添加多个小表情</span>
                    </label>
                    <textarea 
                        id="emojiSmallShieldList" 
                        value={getTextareaValue(lookEmojiSmallShieldList)} 
                        onChange={(e) => setTextareaValue(e.target.value, setEmojiSmallShieldList)}
                    ></textarea>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="sailingAllShield">
                        <span>屏蔽有装扮勋章的所有评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽所有有装扮勋章用户的评论, true 启动屏蔽</span>
                    </label>
                    <select id="sailingAllShield" value={lookSailingAllShield} onChange={(e) => setSailingAllShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="sailingShieldList">
                        <span>按用户装扮勋章屏蔽评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽指定装扮勋章的所有评论, 检测装扮勋章图片链接, 换行添加多个装扮勋章</span>
                    </label>
                    <textarea 
                        id="sailingShieldList"
                        value={getTextareaValue(lookSailingShieldList)} 
                        onChange={(e) => setTextareaValue(e.target.value, setSailingShieldList)}
                    ></textarea>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="avatarFrameAllShield">
                        <span>屏蔽有头像框的所有评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽所有有头像框用户的评论, true 启动屏蔽</span>
                    </label>
                    <select id="avatarFrameAllShield" value={lookAvatarFrameAllShield} onChange={(e) => setAvatarFrameAllShield(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="avatarFrameShieldList">
                        <span>按用户头像框屏蔽评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽指定头像框的所有评论, 检测头像框图片链接, 换行添加多个头像框</span>
                    </label>
                    <textarea 
                        id="avatarFrameShieldList" 
                        value={getTextareaValue(lookAvatarFrameShieldList)} 
                        onChange={(e) => setTextareaValue(e.target.value, setAvatarFrameShieldList)}
                    ></textarea>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="keyWordsShieldList">
                        <span>按关键词屏蔽评论</span>
                        <span className={style["config-item-sub-info"]}>屏蔽指定关键词的所有评论, 检测评论内容, 使用 "," 分割不同词</span>
                    </label>
                    <textarea 
                        id="keyWordsShieldList" 
                        value={lookKeyWordsShieldList} 
                        onChange={(e) => setKeyWordsShieldListValue(e.target.value, setKeyWordsShieldList)}
                    ></textarea>
                </div>

                <div className={style["config-item"]}>
                    <label htmlFor="regularShieldList">
                        <span>正则表达式屏蔽评论</span>
                        <span className={style["config-item-sub-info"]}>使用正则表达式屏蔽所有匹配评论, 匹配方法使用 js 字符串 search(), 换行添加多个表达式</span>
                    </label>
                    <textarea 
                        id="regularShieldList" 
                        value={lookRegularShieldList} 
                        onChange={(e) => setTextareaValue(e.target.value, setRegularShieldList)}
                    ></textarea>
                </div>

                <hr></hr>

                <h1>配置菜单</h1>
                <div className={style["config-item"]}>
                    <label htmlFor="backgroundUrl">
                        <span>设置配置菜单背景图片</span>
                        <span className={style["config-item-sub-info"]}>通过图片 url, 设置配置菜单背景图片</span>
                    </label>
                    <input id="backgroundUrl" type="text" value={lookBackgroundUrl} onChange={(e) => setBackgroundUrl(e.target.value)}/>
                </div>
                <hr></hr>
            </div>

            <div className={style.author}>
                <a href="https://github.com/FengLiuFeseliud">By FengLiuFeseliud</a>
                <a href="https://space.bilibili.com/34394509">Bilibili: FengLiu_Feseliud</a>
                <a href="https://www.mcbbs.net/home.php?mod=space&uid=3686127">Mcbbs: FengLiuFeseliud</a>
                <a href="https://www.mcmod.cn/author/28469.html">McMod: FengLiuFeseliud</a>
                <a href="https://modrinth.com/user/FengLiuFeseliud">Modrinth: FengLiuFeseliud</a>
                <a href="https://www.pixiv.net/users/76113338">Pixiv: FengLiuFeseliud</a>
            </div>
        </div></div>
    )
}

export default options
