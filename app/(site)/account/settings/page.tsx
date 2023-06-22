import SettingsForm from "../../../components/forms/SettingsForm"

const Settings = () => {
  return (
    <div>
      <div className="border-b py-4">
        <h1 className="font-bold text-lg">
          Settings
        </h1>
      </div>  
      <div className="py-4">
        <SettingsForm />
      </div>    
    </div>
  )
}

export default Settings