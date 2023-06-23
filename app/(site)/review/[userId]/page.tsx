import ReviewForm from "../../../components/forms/ReviewForm";

import getCurrentUser from "@/app/actions/getCurrentUser";

const page = async () => {
    // const user = await getUserById(userId);

    return (
        <div className="flex-center min-h-[90vh]">
            <div className="bg-white p-4">
                <ReviewForm />
            </div>
        </div>
    )
}

export default page;