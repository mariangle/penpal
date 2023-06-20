const Biography = ({ bio } : { bio : string }) => {
    return (
        <div className='mt-2 border p-4 profile_card rounded-md '>
            <div className='text-sm'>
                Biography
            </div>
            <div className="rounded-md mt-2 border p-4 bg-white whitespace-pre-wrap">
                <p>{bio}</p>
            </div>
        </div>
    )
}

export default Biography;