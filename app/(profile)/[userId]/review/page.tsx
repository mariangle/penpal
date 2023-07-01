import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
  
import ReviewForm from "@/components/forms/ReviewForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

import getUser from '@/actions/getUser';

const ReviewPage = async ({
    params
}: {
    params: { userId: string; };
}) => {
    const session = await getSession();
    const user = await getUser(params.userId);

    if (!session) redirect("/login")
    if (!user) return null;

    return (
        <div className="min-h-[90vh] grid content-center">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader className="w-full">
                    <CardTitle>Review {user.name}</CardTitle>
                    <CardDescription>Review a PenPal</CardDescription>
                    <CardContent className="p-0">
                        <ReviewForm/>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}

export default ReviewPage;