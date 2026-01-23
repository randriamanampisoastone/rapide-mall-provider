import ReactDOMServer from 'react-dom/server'

export function getIconUrlFromComponent(component: React.ReactElement) {
   const svgString = ReactDOMServer.renderToStaticMarkup(component)
   return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString)
}
