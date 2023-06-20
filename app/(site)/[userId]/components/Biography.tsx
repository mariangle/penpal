const Biography = ({ bio } : { bio : string }) => {
    return (
        <div className='mt-2 border p-4 profile_card rounded-md '>
            <div className='text-sm'>
                Biography
            </div>
            <div className="py-1 rounded-md mt-2 border px-4 bg-white">
                {bio}
            </div>
        </div>
    )
}

export default Biography;