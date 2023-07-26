import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import LetterForm from "@/components/forms/LetterForm";

import getCurrentUser from "@/actions/getCurrentUser";
import prismadb  from "@/lib/prismadb"

const Letter = async ({
    params
}: {
    params: {
        userId: string;
    };
}) => {
    const currentUser = await getCurrentUser();
    const user = await prismadb.user.findFirst({
        where: {
            id: params.userId
        }
    })

    if (!user) return null;

    return (
        <div className="min-h-[90vh] grid content-center">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader className="w-full">
                    <CardTitle>Send {user.name} a letter</CardTitle>
                    <CardDescription>The arrival of the letter may vary based on the distance between you and the recipient.</CardDescription>
                    <CardContent className="p-0 pt-2">
                        <LetterForm recipient={user} user={currentUser}/>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}

export default Letter;