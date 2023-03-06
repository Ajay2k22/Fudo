import { createClient } from "@sanity/client";
import ImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: "68lejvnc",
    dataset: 'production',
    apiVersion: '2023-03-02',
    useCdn: true,
    token: "skKw9KWEzcHcucByNNy0iOZM0u98td5zif3MhttKBTqXmZRM6BHNCTLFIBzgW3wtJSwkK3pM0LV2JiWhnVKG7alRWARHplCM7ohBr5yHBMciwCOTpoh1Ysev4MDuGsNQR9keF65QUB7cMCI5RZfBiNhSMFCtg9dLEEmpLe7zFFh1EeNHvqDS"
})

const builder=ImageUrlBuilder(client)

export const urlFor=(source)=>builder.image(source)