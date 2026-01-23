import './index.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { ThemeProvider } from './components/ThemeProvider'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
   interface Register {
      router: typeof router
   }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
   const root = ReactDOM.createRoot(rootElement)

   root.render(
      <StrictMode>
         <Provider store={store}>
            <QueryClientProvider client={queryClient}>
               <ThemeProvider>
                  <RouterProvider router={router} />
               </ThemeProvider>
            </QueryClientProvider>
         </Provider>
      </StrictMode>,
   )
}
