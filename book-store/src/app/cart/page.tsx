'use client'

import { BackArrow, RemoveCard } from "@/app/svg/svg"
import styles from "./styles.module.css"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RootState } from "@/app/store"
import { removeFromCart, updateCartQuantity } from "../features/books/bookSlice";
import { useSelector } from "react-redux"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const CartPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const { cart } = useAppSelector((state: RootState) => state.books)
    const { email } = useSelector((state: RootState) => state.profile);

     useEffect(() => {
        if (!email) {
            router.push('/signin');
        }
    }, [email, router]);

    if (!email) {
        return null;
    }
    const handleQuantityChange = (isbn13: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            dispatch(removeFromCart({
                isbn13,
                userId: email || undefined
            }))
        } else {
            dispatch(updateCartQuantity({ isbn13, quantity: newQuantity, userId: email || undefined }))
        }
    }

    const handleRemoveItem = (isbn13: string) => {
        dispatch(removeFromCart({
            isbn13,
            userId: email || undefined
        }))
    }

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', '')) || 0;
            return total + (price * item.quantity);
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const vat = subtotal * 0.2;
    const total = subtotal + vat;

    return (
        <div className={styles.cart}>
            <div className={styles.cart_header}>
                <Link href="/" className={styles.cart_back_button}> <BackArrow /></Link>
                <h1 className={styles.cart_title}>your cart</h1>
            </div>
            <div className={styles.cart_container}>
                {cart.length === 0 ? (
                    <div className={styles.empty_card}>
                        <p>Ваша корзина пуста</p>
                    </div>) : (
                    <>
                        <div className={styles.cart_items}>
                            {cart.map((item) => (
                                <div key={item.isbn13} className={styles.cart_item}>
                                    <div className={styles.item_img}>
                                        <img src={item.image} alt={item.title} />
                                    </div>

                                    <div className={styles.item_info}>
                                        <h3 className={styles.item_title}>{item.title}</h3>
                                        <p className={styles.item_author}>by Lantin Joseph, Apress 2018</p>
                                        <div className={styles.quantity_controls}>
                                            <button
                                                className={styles.quantity_button}
                                                onClick={() => handleQuantityChange(item.isbn13, item.quantity - 1)}>
                                                -
                                            </button>
                                            <span className={styles.quantity}>{item.quantity}</span>
                                            <button
                                                className={styles.quantity_button}
                                                onClick={() => handleQuantityChange(item.isbn13, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>


                                    <div className={styles.item_price}>
                                        {item.price}
                                    </div>
                                    <button
                                        className={styles.item_remove_button}
                                        onClick={() => handleRemoveItem(item.isbn13)}
                                    >
                                        <RemoveCard />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.summary}>
                            <div className={styles.summary_sum_total}>
                                <span className={styles.summary_desc}>Sum total</span>
                                <span className={styles.summary_price}>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className={styles.summary_sum_total}>
                                <span className={styles.summary_desc}>VAT</span>
                                <span className={styles.summary_price}>${vat.toFixed(2)}</span>
                            </div>
                            <div className={styles.summary_total_row}>
                                <span>TOTAL:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button className={styles.summery_checkout_button}>
                                CHECK OUT
                            </button>
                        </div>
                    </>

                )}
            </div>
        </div>
    )
}

export default CartPage