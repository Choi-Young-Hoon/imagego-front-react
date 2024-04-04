import ImageGallaryCard from "@/pages/ImageGallaryCard.jsx";
import Header from "@/pages/Header.jsx";

import { Button } from "@/components/ui/button.jsx"
import {Input} from "@/components/ui/input.jsx";

import {UserSessionContext} from "@/App.jsx";
import {useContext, useState} from "react";
import {useEffect} from "react";

export default function ImageGallary() {
    const {jwtToken: token, userId} = useContext(UserSessionContext);

    const [imageData, setImageData] = useState();

    const requestImageAll = () => {
        fetch(`/api/image/all`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(function (data) {
                setImageData(data);
            });
    }
    useEffect(() => {
        requestImageAll();
    });

    return (
        <div>
            <Header userId={userId}/>
            <div className="flex flex-col min-h-screen pt-16">
                <main className="flex-1">
                    <div className="container py-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2"><h1 className="text-3xl font-bold">이미지</h1></div>
                            <div className="ml-auto flex items-center gap-4">

                                <Input placeholder="Title 검색"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {(imageData || []).map(image => (
                                <ImageGallaryCard
                                    key={image.id}
                                    imageId={image.id}
                                    imageUrl={`${window.location.protocol}//${image.imageUrl}`}
                                    title={image.title}
                                    description={image.description}
                                    onUpdateImage={requestImageAll}
                                />
                            ))}
                          </div>
                    </div>
                </main>
            </div>
        </div>
    )
}


