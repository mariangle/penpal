import LetterForm from "@/app/components/forms/LetterForm"

const newLetter = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Send a letter</h1>
      <LetterForm />
    </div>
  )
}

export default newLetter