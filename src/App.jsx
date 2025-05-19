import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import CompanyList from './components/CompanyList'
import Filters from './components/Filters'
import NavBar from './components/NavBar'
import {Provider} from 'react-redux'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import IKImage from './components/IKImage'
import store from '../store/store'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <NavBar/>
      <Filters/>
      <CompanyList/>
      <IKImage/>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
    
      
    </>
  )
}

export default App
