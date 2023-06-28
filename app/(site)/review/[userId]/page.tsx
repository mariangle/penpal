import ReviewForm from "../../../components/forms/ReviewForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const ReviewPage = async () => {
    const session = await getSession();

    if (!session) redirect("/login")

    return (
        <div className="flex-center min-h-[90vh]">
            <div className="bg-white p-4">
                <ReviewForm />
            </div>
        </div>
    )
}

export default ReviewPage;