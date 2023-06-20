import Link from "next/link";
import { usePathname } from "next/navigation";

const Reviews = () => {
    const pathname = usePathname();
    
    return (
        <div className='mt-2 w-full border p-4 profile_card rounded-md'>
            <div className='text-sm'>
                Reviews
            </div>
            <div>
                <Link href={`/review/${pathname}`}>
                    Write a review...
                </Link>
            </div>
        </div>
    )
}

export default Reviews;