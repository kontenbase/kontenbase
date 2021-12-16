import UserType from "./User"

type ChatType = {
  _id: string
  text: string
  createdAt: string
  createdBy?: UserType
}

export default ChatType