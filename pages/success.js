import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import OrderModal from '../components/OrderModal.jsx'

export default function Success(params) {
    return (
        <>
            <Header></Header>
            <OrderModal opened={true} PaymentMethod={1} />
            <Footer></Footer>
        </>
    )
}
