const Biography = ({ bio } : { bio : string }) => {
    return (
        <div className='border p-4 profile_card rounded-md '>
            <div className='text-sm'>
                Biography
            </div>
            <div className="rounded-md mt-2 border p-4 profile_card">
                <p>
                    {bio || "User has not added a bio."}
                </p>
            </div>
        </div>
    )
}

export default Biography;