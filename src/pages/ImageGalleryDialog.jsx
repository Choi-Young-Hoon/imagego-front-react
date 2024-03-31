import {useNavigate} from "react-router-dom";

import {Dialog, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";

export default function ImageGalleryDialog({isOpen, closeModal, imageId, imageUrl, title, description}) {
    const nav = useNavigate();

    const onImageConvertClick = () => {
        nav("/convert?id=" + imageId);
    }

    return (
        <Dialog isOpen={isOpen} onDismiss={closeModal} className="w-[60%] h-[70%] mx-auto my-auto">
            <DialogTrigger asChild>
                <Button variant="outline">수정하기</Button>
            </DialogTrigger>
            <DialogContent className="">
                <img alt="Image" className="rounded-t-xl object-cover" height={400} src={imageUrl} width={800}/>
                <div className="grid grid-cols-1 gap-2">
                    <Label>제목</Label>
                    <Input className="w-full" value={title}/>
                    <Label>설명</Label>
                    <Input className="w-full" value={description}/>
                </div>

                <Button onClick={onImageConvertClick}> 이미지 변환 </Button>

                <DialogFooter>
                    <DialogTrigger as={Button} onClick={closeModal}>닫기</DialogTrigger>
                </DialogFooter>
            </DialogContent>


        </Dialog>
    )
}