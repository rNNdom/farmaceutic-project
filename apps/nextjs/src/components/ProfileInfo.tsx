'use client'
import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'

export default function ProfileInfo() {
  return (
    <form>
      <div className='grid w-full items-center gap-4'>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Nombres</Label>
          <Input id='name' placeholder='John Doe...' />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Apellidos</Label>
          <Input id='name' placeholder='Gootren Gooher...' />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Correo electrónico</Label>
          <Input id='name' placeholder='example@example.com' />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Contraseña</Label>
          <Input id='name' placeholder='Escriba su contraseña aquí...' type='password' />
        </div>

        <div className='flex justify-between pt-10'>
          <Button className='bg-sky-400'>Editar</Button>
          <Button className='bg-sky-400'>Cerrar Sesión</Button>
        </div>
      </div>
    </form>
  )
}
