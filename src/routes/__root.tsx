import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify'
import { useTheme } from '@/components/ThemeProvider'
import NotFound404Component from '@/components/NotFound404Component '

export const Route = createRootRoute({
   component: RootComponent,
   notFoundComponent: () => <NotFound404Component item='page' />,
})

function RootComponent() {
   const theme = useTheme()
   return (
      <>
         <Outlet />
         <ToastContainer
            position='bottom-right'
            autoClose={5000}
            hideProgressBar={false}
            pauseOnHover={true}
            theme={theme.theme}
            stacked
         />
         {/* <TanStackRouterDevtools /> */}
      </>
   )
}
