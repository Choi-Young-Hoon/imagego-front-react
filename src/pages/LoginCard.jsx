import {useNavigate} from "react-router-dom";
import { Input } from "@/components/ui/input.jsx"
import { Button } from "@/components/ui/button.jsx"
import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {useContext, useState} from "react";
import {UserSessionContext} from "@/App.jsx";

export default function LoginCard() {
    const {setJwtToken, setUserId} = useContext(UserSessionContext);

    const nav = useNavigate()

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onLoginClick = () => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                password: password }),
        })
            .then(response => response.json())
            .then(function (data) {
                if (data.result === "success") {
                    setUserId(id);
                    setJwtToken(data.jwt);
                    nav("/gallery");
                } else {
                    alert(data.reason);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const onRegisterClick = () => {
        nav("/register")
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-6 space-y-6 sm:px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-2">
                    <h2 className="text-3xl font-bold">ImageGO 로그인</h2>
                    <p className="text-gray-500 dark:text-gray-400">계정과 암호를 입력하세요</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">계정</Label>
                        <Input onChange={(e) => setId(e.target.value)} id="email" placeholder="m@example.com" type="email"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">암호</Label>
                        <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password"/>
                    </div>
                    <Button className="w-full" color={"blue"} onClick={onLoginClick}>로그인</Button>
                    <Button className={"w-full"} color={"blue"} onClick={onRegisterClick}>회원가입</Button>
                </CardContent>
            </Card>
        </div>
    )
}