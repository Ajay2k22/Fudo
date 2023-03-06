import Image from 'next/image'
import css from '../styles/Hero.module.css'
import Cherry from '../assets/Cherry.png'
import HeroImage from '../assets/HeroImage.png'
import { UilPhone } from '@iconscout/react-unicons'
import Pizza1 from '../assets/p1.jpg'
const Hero = () => {
    return (
        <div className={css.container}>
            {/* LEFT SIDE */}
            <div className={css.left}>
                <div className={css.cheeryDiv}>
                    <span>More than Faster</span>
                    <Image src={Cherry} width={40} height={25} />
                </div>

                <div className={css.heroText}>
                    <span>Be the Fastest</span>
                    <span>In Delivery</span>
                    <span>Your <span style={{ color: "var(--themeRed)" }}>Pizza</span> </span>
                </div>

                <div className={css.miniText}>
                    Our Mission is to filling your tummy with delicious Food
                    and with fast and free Delivery
                </div>

                <button className={`btn ${css.btn}`}>
                    Get Started
                </button>
            </div>
            {/* RIGHT SIDE */}
            <div className={css.right}>
                <div className={css.imageContainer}>
                    <Image src={HeroImage} alt="" layout='intrinsic' />
                </div>

                <div className={css.ContactUs}>
                    <span>Contact Us</span>
                    <div>
                        <UilPhone color="white" />
                    </div>
                </div>

                <div className={css.Pizza}>
                    <div>
                        <Image src={Pizza1} alt="" layout='intrinsic' objectFit='cover' />
                    </div>
                    <div className={css.details}>
                        <span>
                            Italian Pizza
                        </span>
                        <span>
                            <span style={{color:"var(--themeRed)"}}>$</span> 7.49
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero