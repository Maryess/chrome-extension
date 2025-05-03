import { Layout } from "components/index"
import { ChakraProvider, RouterProvider } from ".."
import { ReactNode } from "react"

type Props = {
}

export default () => {
    return (
       <ChakraProvider>
          <Layout>
            <RouterProvider/>
          </Layout>
       </ChakraProvider> 
    )
}