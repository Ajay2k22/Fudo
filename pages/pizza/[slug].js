
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { client } from "../../lib/client"
import { urlFor } from "../../lib/client"
import Image from "next/image"
import css from "../../styles/Pizza.module.css"
import LeftArrow from "../../assets/arrowLeft.png"
import RightArrow from "../../assets/arrowRight.png"
import { useState } from "react"
import { useStore } from "../../store/store"
import toast, { Toaster } from 'react-hot-toast'


export default function Pizza({ pizza }) {
    const [Size, setSize] = useState(1)
    const [Quantity, setQuantity] = useState(1)
    const src = urlFor(pizza.image).url()

    const handleQuan = (type) => {
        type == "inc" ? setQuantity((prev) => prev + 1) : Quantity === 1 ? null : setQuantity((prev) => prev - 1)
    }

    // add to cart function
    const addPizza = useStore((state) => state.addPizza)
    const addToCart = () => {
        addPizza({ ...pizza, price: pizza.price[Size], quantity: Quantity, size: Size })
        console.log('pizza added')
        toast.success("Added to cart")
    }
    return (
        <>
            <Header></Header>
            <div className={css.container}>
                <div className={css.ImageWrapper}>
                    <Image
                        loader={() => src}
                        layout="fill"
                        alt=""
                        unoptimized
                        src={src}
                        objectFit="cover"
                    />
                </div>

                {/* right side */}
                <div className={css.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>
                    <span><span style={{ color: 'var(--themeRed)' }}> $ </span>{pizza.price[Size]}</span>
                    <div className={css.size}>
                        <span>Size</span>
                        <div className={css.SizeVariants}>
                            <div onClick={() => setSize(0)}
                                className={Size === 0 ? css.selected : ""}
                            >Small</div>
                            <div onClick={() => setSize(1)}
                                className={Size === 1 ? css.selected : ""}
                            >Medium</div>
                            <div onClick={() => setSize(2)}
                                className={Size === 2 ? css.selected : ""}
                            >Large</div>
                        </div>
                    </div>

                    {/* Quantity counter */}
                    <div className={css.quantity}>
                        <span>Quantity</span>
                        <div className={css.counter}>
                            <Image src={LeftArrow}
                                height={20}
                                width={20}
                                alt=""
                                objectFit="contain"
                                onClick={() => handleQuan("dec")}
                            />

                            <span>{Quantity}</span>

                            <Image src={RightArrow}
                                height={20}
                                width={20}
                                alt=""
                                objectFit="contain"
                                onClick={() => handleQuan("inc")}
                            />
                        </div>
                    </div>
                    {/* button */}
                    <div className={`btn ${css.btn}`} onClick={addToCart}>
                        Add to Cart
                    </div>
                </div>
                <Toaster/>
            </div>
            <Footer></Footer>
        </>
    )
}


export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type=="pizza" && defined(slug.current)][].slug.current
        `
    );
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: "blocking"
    };
}



export async function getStaticProps({ params }) {
    const { slug = "" } = params;
    const pizza = await client.fetch(
        `*[_type=="pizza" && slug.current=="${slug}"][0]`
    );
    return {
        props: {
            pizza,
        },
    };
}
