import { IUser } from '@/app/types/User'
import { HiXCircle } from "react-icons/hi"

import ProfileForm from '../../account/components/ProfileForm'
import Icon from '@/app/components/Icon'

interface EditPanelProps {
  onClick: () => void;
  user: IUser;
}

const EditPanel = ({ user, onClick }: EditPanelProps) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-screen-lg mx-auto bg-white p-4 border rounded-md relative">
        <div
          onClick={onClick}
          className="cursor-pointer absolute top-2 right-3"
        >
          <Icon icon={HiXCircle} size={24} />
        </div>
        {user && <ProfileForm />}
      </div>
    </div>
  );
};

export default EditPanel;
