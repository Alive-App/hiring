import * as S from './styles'

interface IInputProps {
  name: string
  fieldName: string
  label?: string
}

type InputProps = JSX.IntrinsicElements['input'] & IInputProps

export const Input = ({ name, label, ...rest }: InputProps) => {
  return (
    <S.Container>
      {label && <label htmlFor={name}>{label}</label>}

      <input id={name} name={name} {...rest} />
    </S.Container>
  )
}

export default Input
