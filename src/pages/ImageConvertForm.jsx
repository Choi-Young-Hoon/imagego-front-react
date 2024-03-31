import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";

export default function ImageConvertForm() {
    return (
        <div className={"p-2 gap-12"}>
            <div>
                <Card>
                    <CardContent>
                        <div className="space-y-2 p-3">
                            <Label>포멧 선택</Label>
                            <select className="w-full form-select">
                                <option>.jpg</option>
                                <option>.png</option>
                                <option>.webp</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card>
                    <CardContent>
                        <div className="p-3">
                            <div className="space-y-2">
                                <Label>이미지 사이즈</Label>
                                <Input id="width" placeholder="Width" type="number"/>
                                <Input id="height" placeholder="Height" type="number"/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}