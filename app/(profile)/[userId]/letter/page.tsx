import LetterForm from "@/components/forms/LetterForm";
import { redirect } from "next/navigation";

import getUser from '@/actions/getUser';
import getCurrentUser from "@/actions/getCurrentUser";

const Letter = async ({
    params
}: {
    params: {
        userId: string;
    };
}) => {
    const currentUser = await getCurrentUser();
    const user = await getUser(params.userId);

    if (!currentUser) redirect("/login")
    if (!user) return null;

    return (
        <div className="min-h-[90vh] grid content-center">
            <h1>Send {user.name} a letter</h1>
            <LetterForm email={user.email}/>
        </div>
    )
}

export default Letter;