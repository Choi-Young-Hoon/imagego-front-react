import {useNavigate} from "react-router-dom";

import {Dialog, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";

export default function ImageConvertAIModal({isOpen, closeModal, imageUrl}) {
    const nav = useNavigate();

    return (
        <Dialog isOpen={isOpen} onDismiss={closeModal} className="w-[60%] h-[70%] mx-auto my-auto">
            <DialogTrigger asChild>
                <Button className={"w-full"}>AI 스케일링</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <img
                    alt="Image"
                    className="rounded-t-xl object-cover"
                    height={400}
                    src={imageUrl}
                    width={800}
                />
                <div className="grid grid-cols-1 gap-2">
                    <Label>변환 비율 선택</Label>
                    <select className="w-full form-select">
                        <option>2배</option>
                        <option>4배</option>
                        <option>8배</option>
                    </select>
                </div>

                <Button> 이미지 변환 </Button>

                <DialogFooter>
                    <DialogTrigger as={Button} onClick={closeModal}>닫기</DialogTrigger>
                </DialogFooter>
            </DialogContent>


        </Dialog>
    )
}