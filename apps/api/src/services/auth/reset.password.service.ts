import { hashPassword } from '@/lib/bcrypt'
import prisma from '@/prisma'
import React from 'react'

export const resetPasswordService = async (
    userId:number,
    password:string,
) => {
  try{
const user = await prisma.user.findFirst({
    where:{id: userId,provider:'CREDENTIALS'}
})

if(!user){
    throw new Error('Account not found')
}

const hashedPassword = await hashPassword(password)

await prisma.user.update({
    where: {id: userId},
    data: {password: hashedPassword},
})

return{
    message: 'Reset password succes'
}
  }catch(error){
    throw error
  }
}
