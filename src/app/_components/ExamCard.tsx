'use client';
import { FC } from "react";
import { SubjectType } from "../(public)/page";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface props {
    exam: SubjectType;
    isFeatured?: boolean;
}

const ExamCard: FC<props> = ({ exam, isFeatured }) => {
    const router = useRouter();
    return (

        <Card>
            <CardHeader>
                <CardTitle>{exam.displayName}</CardTitle>
                <CardDescription>香港中學文憑試</CardDescription>
            </CardHeader>
            <CardContent>
                <p>共 {exam.numberOfquestions} 題</p>
            </CardContent>
            <CardFooter>
                <Button variant={isFeatured ? 'default' : 'secondary'} onClick={() => router.push(`/exam/${exam.path}`)}>開始</Button>
            </CardFooter>
        </Card>



    );
}

export default ExamCard;