import { Metadata } from "next";

type Props = {
    params: {
        id: string;
    }
}
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const title = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Product name ${params.id}`)
        }, 100);
    })
    return {
        title: `${title}`
    }
}
export default function ProductDetails({ params }: Props) {
    return (
        <div>
            <h1>Product {params.id}</h1>
        </div>
    );
}