
import "./FormErrorMessage.css"

export default function FormErrorMessage({message}) {
  return (
    <p className='form-error-message'>*{message}</p>
  )
}
