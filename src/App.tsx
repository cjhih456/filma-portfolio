import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { IndexPage } from './pages/IndexPage'
import { FrontendPage } from './pages/FrontendPage'
import { BackendPage } from './pages/BackendPage'
import { MlPage } from './pages/MlPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/frontend" element={<FrontendPage />} />
        <Route path="/backend" element={<BackendPage />} />
        <Route path="/ml" element={<MlPage />} />
      </Routes>
    </Layout>
  )
}

export default App
