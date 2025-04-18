import { useNavigate } from 'react-router-dom'
import './Success.css'

const Success = () => {
  const navigate = useNavigate()

  return (
    <div className="success-container">
      <div className="success-message">
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your order. Your food will be delivered soon.</p>
        <p>Payment will be collected at the time of delivery.</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    </div>
  )
}

export default Success 