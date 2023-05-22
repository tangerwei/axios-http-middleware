import * as md5 from "md5";

function generateKey(origin:string){
    return md5(origin)
}


class DataBase{
    cacheKey:any = {}
    cachedData:any = {}
    cacheDataKey: string;

    constructor(_key: string) {
        this.cacheDataKey = md5(_key);
        const _dataStr = localStorage.getItem(this.cacheDataKey) || '{}';

        try {
            const _dataObj = JSON.parse(_dataStr);
            if(typeof _dataObj === "object"){
                this.cachedData = _dataObj;
            }
        }catch (e){
            this.cachedData = {};
        }
    }

    queryKey = (key: string) => {
        if(!this.cacheKey[key]){
            this.cacheKey[key] = generateKey(key);
        }
        return this.cacheKey[key]
    }

    save = (key: string, value: any) => {
        const _key = this.queryKey(key);
        this.cachedData[_key] = value;
        localStorage.setItem(this.cacheDataKey, JSON.stringify(this.cachedData))
    }

    delete = (key: string) => {
        const _key = this.queryKey(key);
        delete this.cachedData[_key];
        localStorage.setItem(this.cacheDataKey, JSON.stringify(this.cachedData))
    }

    getValue = (key: string) => {
        const _key = this.queryKey(key);
        return this.cachedData[_key]
    }
}

export default DataBase;
