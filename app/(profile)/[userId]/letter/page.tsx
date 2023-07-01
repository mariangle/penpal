import LetterForm from "@/components/forms/LetterForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

import getUser from '@/actions/getUser';

const Letter = async ({
    params
}: {
    params: {
        userId: string;
    };
}) => {
    const session = await getSession();
    const user = await getUser(params.userId);

    if (!session) redirect("/login")
    if (!user) return null;

    return (
        <div className="min-h-[90vh] grid content-center">
            <h1>Send {user.name} a letter</h1>
            <LetterForm email={user.email}/>
        </div>
    )
}

export default Letter;