type Props = {
  name: string
  picture: string
}

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      {picture && <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name || 'Anonymous'} />}
      <div className="text-xl font-bold">{name || 'Anonymous'}</div>
    </div>
  )
}

export default Avatar
