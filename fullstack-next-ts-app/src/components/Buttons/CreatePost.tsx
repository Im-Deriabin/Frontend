import { useUser } from '@/utils/swr'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import CreatePostForm from '../Forms/CreatePost'
import Modal from '../Modal'

// при наличии данных пользователя рендерится модалка с формой для создания поста
// при отсутствии данных пользователя рендерится уведомление о необходимости авторизации
export default function CreatePostButton() {
  const { user } = useUser()

  const onClick = () => {
    toast('Authorization required', {
      type: 'warning'
    })
  }

  return user ? (
    <Modal
      triggerComponent={
        <Button variant='contained' sx={{ my: 2 }}>
          Создать пост
        </Button>
      }
      modalContent={<CreatePostForm />}
      size='M'
    />
  ) : (
    <Button variant='contained' sx={{ my: 2 }} onClick={onClick}>
      Создать пост
    </Button>
  )
}
