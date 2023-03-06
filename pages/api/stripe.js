import Stripe from 'stripe'
const stripe = new Stripe("sk_test_51MiZPzSInHMY5EdJawciTr6ecS1fCgrMlW4s947qBaLmW9wu8jan7s8yUIuapPiWzedoTpblxU4eH3sPkobNmEwV00TndwrUNO")
export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            console.log("main")
            const body = JSON.parse(req.body)
            const params = {
                submit_type: 'pay',
                mode: "payment",
                payment_method_types: ['card'],
                line_items: body.map((item) => {
                    const img = item.image.asset._ref;
                    const newImage = img.replace(
                        "image-",
                        "https://cdn.sanity.io/images/68lejvnc/production/"
                    ).replace('-jpg', '.jpg')
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImage]
                            },
                            unit_amount: item.price * 100
                        },
                        adjustable_quantity: {
                            enabled: false
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/cart`
            };

            // checkout session

            const session = await stripe.checkout.sessions.create(params)
            console.log(session)
            res.status(200).json(session)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    else {
        res.setHeader("Allow", "POST")
        res.status(405).end("method not allowed")
    }
}