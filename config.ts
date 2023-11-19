import { Storage } from "@plasmohq/storage"


class Config{
    public static config: Config = new Config()
    private storage: Storage = new Storage()

    public async get<T>(configName: String, defaultValue: T): Promise<T>{
        var value: T = await <Promise<T>>this.storage.get(<string>configName)
        if(value){
            if(typeof value == "string"){
                return JSON.parse(value)
            }
            return value
        }
        return defaultValue
    }

    public async set<T>(configName: String, value: T){
        await this.storage.setItem(<string>configName, value)
    }

    public async nodeAttributeInConfigList(
            value: HTMLCollectionOf<Element>, 
            configListName: String, 
            predicate: (config: String, node: HTMLElement) => boolean
        ): Promise<boolean>{
        if(value.length == 0){
            return false;
        }
        
        if((<Array<String>>await this.get(<string>configListName, [])).find((config) => predicate(config, <HTMLElement>value.item(0))) == undefined){
            return false;
        }

        return true;
    }
}


export {Config}