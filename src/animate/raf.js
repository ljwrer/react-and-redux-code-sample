const getRaf = function () {
    let timeStamp = Date.now()
    return function (fn) {
        const currentTimeStamp = Date.now()
        const gap = currentTimeStamp - timeStamp
        const delay = Math.max(0, 16 - gap)
        const tid = setTimeout(function () {
            fn(currentTimeStamp)
        }, delay)
        timeStamp = currentTimeStamp
        return tid
    }
}
const raf = getRaf()
const animate = (function (ele) {
    const timeStamp = Date.now()
    return function (currentTimeStamp) {
        const dist = (currentTimeStamp - timeStamp)/16
        ele.style.transform = `translateX(${dist}px)`
        if(dist<1000){
            raf(animate)
        }

    }
})(document.getElementById('box'))
animate()