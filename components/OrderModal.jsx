import { Modal, Button, Group, useMantineTheme } from '@mantine/core';
import css from '../styles/OrderModal.module.css'
import { useState } from 'react';
import { createOrder } from '../lib/orderHandler';
import Toaster, { toast } from 'react-hot-toast';
import { useStore } from '../store/store';
import { useRouter } from 'next/router';

export default function OrderModal({ opened, setOpened, PaymentMethod }) {
    const router = useRouter()
    const theme = useMantineTheme()
    const [FormData, setFormData] = useState({});

    const handleInput = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value })
    }



    const total = typeof window !== "undefined" && localStorage.getItem('total')
    const resetCart = useStore((state) => state.resetCart)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const id = await createOrder({ ...FormData, total, PaymentMethod })

        console.log("Order Placed", id)
        toast.success("Order is Placed")
        resetCart()
        {
            typeof window != 'undefined' && localStorage.setItem('order', id)
        }
        router.push(`/order/${id}`)
    }
    return (
        <Modal
            opened={opened}
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            onClose={() => setOpened(null)}
        >
            {/* Modal content */}
            <form onSubmit={handleSubmit} action="" className={css.formContainer}>
                <input onChange={handleInput} type="text" name='name' required placeholder='Name' />
                <input onChange={handleInput} type="text" name='phone' required placeholder='Phone Number' />
                <textarea onChange={handleInput} name="address" placeholder='Address' rows={3}></textarea>
                <span>You will Pay <span>$ {total}</span> on Delivery</span>
                <button type='submit' className='btn'>Place Order</button>
            </form>

        </Modal>
    )
}