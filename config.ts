import { Storage } from "@plasmohq/storage"


class Config{
    public static config: Config = new Config()
    private storage: Storage = new Storage()

    public getStorage(): Storage{
        return this.storage
    }

    public async getInt(configName: String): Promise<number>{
        return Math.trunc(await this.storage.get(<string>configName))
    }

    public async getBool(configName: String): Promise<boolean>{
        return (await this.storage.get(<string>configName)) == "true"
    }

    public async nodeAttributeInConfigList(
            value: HTMLCollectionOf<Element>, 
            configListName: String, 
            predicate: (config: String, node: HTMLElement) => boolean
        ): Promise<boolean>{
        if(value.length == 0){
            return false;
        }
        
        if((<Array<String>>await this.storage.get(<string>configListName)).find((config) => predicate(config, <HTMLElement>value.item(0))) == undefined){
            return false;
        }

        return true;
    }
}


export {Config}