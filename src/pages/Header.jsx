import {Avatar} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";

import {UserSessionContext} from "@/App.jsx";
import {useContext} from "react";

export default function Header({userId}) {
    const {jwtToken: token, setJwtToken} = useContext(UserSessionContext);

    const nav = useNavigate();

    fetch(`/api/echo`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {
            if (response.status !== 200) {
                nav("/");
            }
        });

    const uploadClick = () => {
        nav("/upload");
    }

    const homeClick = () => {
        nav("/gallery");
    }

    const logoutClick = () => {
        setJwtToken("");
        nav("/");
    }

    return (
        <header className="border-b py-4 fixed top-0 inset-x-0 z-10 bg-white items-start">
            <div className="flex flex-col">
                <div className="container flex items-center justify-between gap-4">
                    <nav className="flex items-center gap-6">
                        <a className="flex items-center gap-2 font-semibold" onClick={homeClick}>
                            <HomeIcon className="h-6 w-6"/>
                            ImageGO
                        </a>
                    </nav>


                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8"/>
                            <div className="text-sm font-semibold not-italic">{userId}</div>
                        </div>
                        <Button className="border-2" variant="outline" onClick={logoutClick}>로그아웃</Button>
                        <Button className="border-2" variant="outline" onClick={uploadClick}>업로드</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}


function HomeIcon(props) {
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    )
}