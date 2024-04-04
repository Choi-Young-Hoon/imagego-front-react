import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {useState} from "react";

import {Dialog, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";

import {UserSessionContext} from "@/App.jsx";

export default function ImageGalleryDialog({isOpen, closeModal, imageId, imageUrl, title, description}) {
    const {jwtToken: token} = useContext(UserSessionContext);

    const [imageTitle, setImageTitle] = useState(title);
    const [imageDescription, setImageDescription] = useState(description);

    const nav = useNavigate();

    const onImageConvertClick = () => {
        nav("/convert?id=" + imageId);
    }

    const onDeleteClick = () => {
        closeModal();
        fetch(`/api/image/${imageId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    alert('이미지 삭제 중 오류가 발생했습니다.');
                }
                return response.json();
            })
            .then((data) => {

            })
            .catch((error) => {
                console.error('Error:', error); // 오류를 로깅
            });
    }

    const onUpdateClick = () => {
        closeModal();
        fetch(`/api/image/${imageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: imageTitle,
                description: imageDescription,
            }),
        })
            .then(response => response.json())
            .then(function (data) {
                if (data.result === "success") {

                } else {
                    alert(data.reason);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Dialog isOpen={isOpen} onDismiss={closeModal} className="w-[60%] h-[70%] mx-auto my-auto">
            <DialogTrigger asChild>
                <Button variant="outline">수정하기</Button>
            </DialogTrigger>
            <DialogContent className="">
                <img alt="Image" className="rounded-t-xl object-cover" height={800} src={imageUrl} width={800}/>
                <div className="grid grid-cols-1 gap-2">
                    <Label>제목</Label>
                    <Input className="w-full" value={imageTitle} onChange={(e) => {setImageTitle(e.target.value);}}/>
                    <Label>설명</Label>
                    <Input className="w-full" value={imageDescription} onChange={(e) => {setImageDescription(e.target.value);}}/>
                </div>

                <Button onClick={onImageConvertClick}> 이미지 변환 </Button>
                <DialogFooter>
                    <DialogTrigger as={Button} onClick={onUpdateClick}>수정</DialogTrigger>
                    <DialogTrigger as={Button} onClick={onDeleteClick}>삭제</DialogTrigger>
                    <DialogTrigger as={Button} onClick={closeModal}>닫기</DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}