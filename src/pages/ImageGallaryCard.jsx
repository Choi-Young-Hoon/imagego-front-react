import {useState} from "react";

import {Card, CardContent} from "@/components/ui/card.jsx";

import ImageGalleryDialog from "@/pages/ImageGalleryDialog.jsx";


export default function ImageGallaryCard({imageId, imageUrl, title, description, onUpdateImage}) {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);

        onUpdateImage();
    };

    return (
        <div>
            <Card className="w-full max-w-sm">
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 gap-2">
                            <img alt="Image" className="rounded-t-xl object-cover" height={225} src={imageUrl} width={400}/>
                            <h3 className="font-semibold text-lg">{title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>

                            <ImageGalleryDialog isOpen={isOpen}
                                                imageId={imageId}
                                                imageUrl={imageUrl}
                                                title={title}
                                                description={description}
                                                closeModal={closeModal}/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}