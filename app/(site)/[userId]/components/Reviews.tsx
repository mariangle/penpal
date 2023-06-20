import Input from "@/app/components/Input";

const Reviews = () => {
    return (
        <div className='mt-2 w-full border p-4 profile_card rounded-md'>
            <div className='text-sm'>
                Reviews
            </div>
            <div>
                <Input id="review" type="text"/>
            </div>
        </div>
    )
}

export default Reviews;