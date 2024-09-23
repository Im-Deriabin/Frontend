import { NextApiHandlerWithCookie } from '@/types'
import checkFields from '@/utils/checkFields'
import cookies from '@/utils/cookie'
import prisma from '@/utils/prisma'
import { User } from '@prisma/client'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const registerHandler: NextApiHandlerWithCookie = async (req, res) => {
  // извлекаем данные из тела запроса
  const data: Pick<User, 'username' | 'email' | 'password'> = JSON.parse(
    req.body
  )

  // если отсутствует хотя бы одно обязательное поле
  if (!checkFields(data, ['email', 'password'])) {
    return res.status(400).json({ message: 'Some required fields are missing' })
  }

  try {
    // получаем данные пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    // если данные имеются, значит, пользователь уже зарегистрирован
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' })
    }

    // хэшируем пароль
    const passwordHash = await argon2.hash(data.password)
    // и заменяем им оригинальный
    data.password = passwordHash

    // создаем пользователя - записываем учетные данные пользователя в БД
    const newUser = await prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        email: true
      }
    })

    // генерируем токен идентификации на основе ID пользователя
    const idToken = await jwt.sign(
      { userId: newUser.id },
      process.env.ID_TOKEN_SECRET,
      {
        // срок жизни токена составляет 7 дней
        expiresIn: '7d'
      }
    )

    // генерируем токен доступа на основе ID пользователя
    const accessToken = await jwt.sign(
      { userId: newUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d'
      }
    )

    // записываем токен идентификации в куки
    res.cookie({
      name: process.env.COOKIE_NAME,
      value: idToken,
      options: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
        sameSite: true,
        secure: true
      }
    })

    // возвращаем данные пользователя и токен доступа
    res.status(200).json({
      user: newUser,
      accessToken
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'User register error' })
  }
}

export default cookies(registerHandler)