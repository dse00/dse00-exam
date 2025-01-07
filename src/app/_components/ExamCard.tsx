'use client';
import { FC } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaperType } from "@/types/question";
import { cn } from "@/lib/utils";

interface props {
    exam: PaperType;
    isFeatured?: boolean;
    style?: string;
}

const ExamCard: FC<props> = ({ exam, isFeatured, style }) => {
    const router = useRouter();
    return (

        <Card className="flex flex-col basis-1/3">
            <CardHeader className="grow flex flex-col justify-between">
                <CardTitle className={style}>{exam.displayName}</CardTitle>
                <CardDescription>香港中學文憑試</CardDescription>
            </CardHeader>
            <CardContent >
                <p>共 {exam.numberOfquestions} 題</p>
            </CardContent>
            <CardFooter>
                <Button variant={isFeatured ? 'default' : 'secondary'} onClick={() => router.push(`/exam/${exam.path}`)}>開始</Button>
            </CardFooter>
        </Card>



    );
}

export default ExamCard;