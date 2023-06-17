"use client"

import Input from "@/app/components/Input"
import Button from "@/app/components/Button"

import useUser from "@/app/hooks/useUser"
import { deleteUser } from "@/app/actions/deleteUser"

const SettingsForm = () => {
    const { user } = useUser()

    const handleDelete = async () => {
        if (user){
            await deleteUser(user.id)
        }
    }
 
  return (
    <div className="flex flex-col gap-4">
        <div className="border p-4 rounded-md">
            <h2 className="font-semibold">Your Email</h2>
            <p className="text-sm text-gray-500 my-2">This email is used for logging in and allows other users to send you letters.</p>
            <Input id="email" type="email" value={user?.email} disabled/>
        </div>
        <div className="border p-4 rounded-md">
            <h2 className="font-semibold">Your Country</h2>
            <p className="text-sm text-gray-500 my-2">The delivery time for your letter will vary based on the distance between your country and the recipient's country.</p>
            <Input id="country" type="text" value={user?.country} disabled/>
        </div>
        <div className="border rounded-md border-red-600">
            <div className="p-4">
                <h2 className="font-semibold">Delete Account</h2>
                <p className="text-sm text-gray-500 my-2">Please proceed with caution as this action will permanently delete your PenPal account.</p>
            </div>
            <div className="border-t border-red-600 p-4 flex justify-end">
                <Button style="primary" onClick={handleDelete}>Delete Acount</Button>
            </div>
        </div>
    </div>
  )
}

export default SettingsForm