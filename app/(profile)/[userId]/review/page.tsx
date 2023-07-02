import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import NotFound from "@/app/not-found";
import ReviewForm from "@/components/forms/ReviewForm";

import getUser from '@/actions/getUser';
import getCurrentUser from "@/actions/getCurrentUser";

const ReviewPage = async ({
    params
}: {
    params: { userId: string; };
}) => {
    const currentUser = await getCurrentUser();
    const user = await getUser(params.userId);

    if (!user) return NotFound();

    return (
        <div className="min-h-[90vh] grid content-center">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader className="w-full">
                    <CardTitle>Review {user.name}</CardTitle>
                    <CardDescription>Review your experience with {user.name}. </CardDescription>
                    <CardContent className="p-0">
                        <ReviewForm user={user} currentUser={currentUser}/>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}

export default ReviewPage;