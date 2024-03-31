import ImageIcon from "@/pages/public/ImageIcon.jsx";

import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";

export default function ImageConvertImage ({title, imageUrl}) {
    return (
        <div
            className="inline-block rounded-lg overflow-hidden ring-2 ring-gray-200 dark:ring-gray-800">
            <img
                alt={title}
                className="object-cover object-center"
                height="512"
                src={imageUrl}
                style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                }}
                width="512"
            />
        </div>
    )
}