import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/pages/Header.jsx";
import {useContext, useState} from "react";
import {UserSessionContext} from "@/App.jsx";
import {useNavigate} from "react-router-dom";

export default function ImageUpload() {
    const nav = useNavigate();

    const {userId} = useContext(UserSessionContext)

    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('userId', userId)
        formData.append('title', title);
        formData.append('description', description);

        try {
            const response = await fetch(`/api/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.status === 200) {
                alert('이미지가 성공적으로 업로드되었습니다.');
                nav('/gallery');
            } else {
                throw new Error('이미지 업로드 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('이미지 업로드 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div>
            <Header />
            <Card className="w-full h-full max-w-lg mx-auto pt-32">
                <CardHeader>
                    <CardTitle className="text-2xl">이미지 업로드</CardTitle>
                    <CardDescription>지원 이미지 포멧(jpeg, png, jpg, webp)</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div
                        className="border-dashed border-2 border-gray-200 rounded-lg w-full aspect-square mx-auto transition-colors border-dashed border-gray-300 border-2 border-gray-200 dark:border-gray-700"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}>
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" className="w-full h-full object-contain"/>
                        ) : (
                            <div
                                className="flex w-full h-full items-center justify-center text-gray-500 transition-colors border-dashed border-2 border-gray-200 dark:text-gray-400 dark:border-gray-700">
                                <MouseIcon className="w-6 h-6 mr-2"/>
                                {selectedFile ? selectedFile.name : '업로드 이미지 드래그 & 드롭'}
                                <Button size="sm" variant="outline">
                                    파일 선택
                                    <Input className="hidden" type="file" onChange={handleFileChange}/>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="grid w-full gap-2">
                        <Label htmlFor="title">제목</Label>
                        <Input id="title" placeholder="이미지에 대한 제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <Label htmlFor="description">설명</Label>
                        <Textarea className="min-h-[100px]" id="description" placeholder="이미지 설명을 입력 하세요" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <Button className="self-end" onClick={handleSubmit}>업로드</Button>
                </CardContent>
            </Card>
        </div>
    );
}

function MouseIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="5" y="2" width="14" height="20" rx="7"/>
            <path d="M12 6v4"/>
        </svg>
    )
}