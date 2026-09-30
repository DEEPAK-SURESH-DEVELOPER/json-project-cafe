import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainRouter from './router/MainRouter'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import ClickSpark from './components/ClickSpark/ClickSpark'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <CartProvider>
                <ClickSpark
                    sparkColor="#8b5e34"
                    sparkSize={9}
                    sparkRadius={18}
                    sparkCount={8}
                    duration={450}
                    extraScale={1}
                >
                    <MainRouter />
                </ClickSpark>
            </CartProvider>
        </BrowserRouter>
    </StrictMode>
)