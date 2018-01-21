export const getWeather = function (id) {
    return new Promise(function (resolve,reject) {
        fetch(`/data/cityinfo/${id}.html`).then(res=>{
            if(res.status!==200){
                throw new Error(`Fail to get with status:${res.status}`)
            }
            return resolve(res.json())
        },reject)
    })
}