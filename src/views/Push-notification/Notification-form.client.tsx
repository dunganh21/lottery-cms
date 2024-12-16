'use client'

import React, { useState } from 'react'
import { Button, TextField, Form, FormProps, toast } from '@payloadcms/ui'
import { FormState } from 'payload'

const initialFormState: FormState = {
  message: {
    value: '',
    initialValue: '',
    valid: true,
    errorMessage: '',
    validate: () => true,
  },
}

export const NotificationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit: FormProps['onSubmit'] = async (fields, data) => {
    try {
      setIsLoading(true)
      const response = await fetch(process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_API_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: data.message }),
      })

      if (!response.ok) {
        throw new Error('Failed to send notification')
      }
      toast.success('Thông báo đã được gửi thành công')
    } catch (error) {
      toast.error('Lỗi khi gửi thông báo')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit} initialState={initialFormState}>
      <TextField
        path="message"
        field={{
          name: 'message',
          label: 'Nội dung thông báo',
          type: 'text',
          required: true,
        }}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Đang gửi...' : 'Gửi thông báo'}
      </Button>
    </Form>
  )
}
