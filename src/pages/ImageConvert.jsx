import Header from "@/pages/Header.jsx";
import ImageConvertForm from "@/pages/ImageConvertForm.jsx";
import ImageConvertImage from "@/pages/ImageConvertImage.jsx";
import ImageConvertAIModal from "@/pages/ImageConvertAIModal.jsx";

import { Button } from "@/components/ui/button"
import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useContext} from "react";

import {UserSessionContext} from "@/App.jsx";


export default function ImageConvert() {
    const {jwtToken: token} = useContext(UserSessionContext);

    const [searchParams] = useSearchParams();
    const imageId = searchParams.get("id");

    const [isOpen, setIsOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetch(`/api/image/${imageId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(function (data) {
                setTitle(data.title);
                setImageUrl(`${window.location.protocol}//${data.imageUrl}`);
            });
    }, [imageId]);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Header/>
            <div className="flex justify-center min-h-screen pt-24">
                <Card className="w-full  h-full max-w-lg p-12">
                    <CardHeader>
                        <div className="">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">이미지 변환</h1>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                이미지 포멧, 사이즈 변환
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mx-auto max-w-sm space-y-2">
                            <ImageConvertImage title={title}
                                               imageUrl={imageUrl}/>
                            <ImageConvertForm/>
                            <Button className="w-full">변환</Button>
                            <ImageConvertAIModal closeModal={closeModal} isOpen={isOpen} imageUrl={imageUrl}/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
