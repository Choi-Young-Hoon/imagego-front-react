import ImageIcon from "@/pages/public/ImageIcon.jsx";

import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";

export default function ImageConvertImage ({title, imageUrl}) {
    return (
        <div
            className="inline-block rounded-lg overflow-hidden ring-2 ring-gray-200 dark:ring-gray-800">
            <img
                alt={title}
                className="rounded-t-xl object-cover"
                height="512"
                src={imageUrl}
                width="512"
            />
        </div>
    )
}