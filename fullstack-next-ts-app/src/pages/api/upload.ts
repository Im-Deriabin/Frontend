import { NextApiRequestWithUserId } from '@/types'
import authGuard from '@/utils/authGuard'
import prisma from '@/utils/prisma'
import multer from 'multer'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

// создаем обработчик файлов
const upload = multer({
  storage: multer.diskStorage({
    // определяем директорию для хранения аваторов пользователей
    destination: './public/avatars',
    filename: (req, file, cb) => cb(null, file.originalname)
  })
})

// создаем роут
const uploadHandler = nextConnect<
  NextApiRequestWithUserId & { file?: Express.Multer.File },
  NextApiResponse
>()

uploadHandler.use(upload.single('avatar'))

// обрабатываем POST-запрос
uploadHandler.post(async (req, res) => {

  if (!req.file) {
    return res.status(500).json({ message: 'File write error' })
  }

  try {
    // обновляем данные пользователя
    const user = await prisma.user.update({
      
      where: { id: req.userId },
      data: {
        
        avatarUrl: req.file.path.replace('public', '')
      },
      
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        email: true
      }
    })

    // возвращаем данные пользователя
    res.status(200).json(user)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'User update error' })
  }
})

// роут является защищенным
export default authGuard(uploadHandler)

// отключаем преобразование тела запроса в JSON
export const config = {
  api: {
    bodyParser: false
  }
}