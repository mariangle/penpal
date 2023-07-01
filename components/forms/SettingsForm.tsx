"use client"

import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import Icon from "@/components/common/Icon"

import { HiCheckCircle, HiXCircle } from "react-icons/hi"

import { toast } from "react-hot-toast"
import { signOut } from "next-auth/react"
import axios from "axios"
import { handleError } from "@/lib/error"
import { IUser } from "@/common.types"

const SettingsForm = ({ user } : { user: IUser}) => {

    const onDelete = async () => {
        try {
            const response = await axios.delete(`/api/users/${user.id}`)
            toast.success(response.data)
            signOut();
        } catch (err) {
            handleError(err)
        }
    };  

  return (
    <div className="flex flex-col gap-4">
        <div className="border p-4 rounded-md">
            <h2 className="font-semibold">Your Email</h2>
            <p className="text-sm text-muted-foreground">This email is used for logging in and allows other users to send you letters.</p>
            <Input id="email" type="email" value={user.email} disabled/>
        </div>
        <div className="border p-4 rounded-md">
            <h2 className="font-semibold">Your Country</h2>
            <p className="text-sm text-muted-foreground my-2">The delivery time for your letter will vary based on the distance between your country and the recipient's country.</p>
            <Input id="country" type="text" value={user.country} disabled/>
        </div>
        <div className="border p-4 rounded-md">
            <div className="flex gap-2 items-center">
                <h2 className="font-semibold">{user.isVerified ? "Verified" : "Verification"}</h2>
                {user?.isVerified ? (<Icon icon={HiCheckCircle} color="#1174c5"/>) : (<Icon icon={HiXCircle} color="#991919"/>)}
            </div>
            {!user?.isVerified ? (
            <p className="text-sm text-muted-foreground my-2">Verify your account by adding a bio, profile image and cover photo.</p>) 
              : (
                <p className="text-sm text-muted-foreground my-2">You have verified your account.</p>
                )
            }
        </div>
        <div className="border rounded-md border-red-600">
            <div className="p-4">
                <h2 className="font-semibold">Delete Account</h2>
                <p className="text-sm text-muted-foreground my-2">Please proceed with caution as this action will permanently delete your PenPal account.</p>
            </div>
            <div className="border-t border-red-600 p-4 flex justify-end">
                <Button variant="destructive" onClick={onDelete}>Delete Acount</Button>
            </div>
        </div>
    </div>
  )
}

export default SettingsForm