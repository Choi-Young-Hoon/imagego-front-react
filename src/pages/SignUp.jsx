import {useNavigate} from "react-router-dom";

import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useState} from "react";

export default function SignUp() {
    const nav = useNavigate();

    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const onCancelClick = () => {
        nav("/");
    }

    const requestSignUp = () => {
        fetch("/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(function (data) {
                if (data.result === "success") {
                    nav("/");
                } else {
                    alert("회원 가입에 실패했습니다 - " + data.reason);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-6 space-y-6 sm:px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-2">
                    <h2 className="text-3xl font-bold">회원 가입</h2>
                    <p className="text-gray-500 dark:text-gray-400">계정과 암호를 입력하세요</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input onChange={(e) => setId(e.target.value)} id="email" placeholder="m@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">암호</Label>
                        <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" />
                    </div>
                    <Button className="w-full" color={"blue"} onClick={requestSignUp}>가입하기</Button>
                    <Button className={"w-full"} color={"blue"} onClick={onCancelClick}>취소</Button>
                </CardContent>
            </Card>
        </div>
    )
}