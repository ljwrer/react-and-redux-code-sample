import asyncComponent from '../asyncComponent'
const notFound = asyncComponent(() => import('./404'))
const about = asyncComponent(() => import('./about'))
const home = asyncComponent(() => import('./home'))

export {
    notFound,
    about,
    home
}