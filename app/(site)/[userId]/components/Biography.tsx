interface IBiographyProps {
    bio?: string;
  }
  
  const Biography = ({ bio }: IBiographyProps) => {
    return (
        <div className='border p-4 profile_card rounded-md '>
            <div className='text-sm font-semibold'>
                Biography
            </div>
            <div className="rounded-md mt-2 border p-4 profile_card">
                <p>
                    {bio || "This user hasn't provided any information about themselves."}
                </p>
            </div>
        </div>
    )
}

export default Biography;