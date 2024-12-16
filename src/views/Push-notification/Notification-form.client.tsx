'use client'

import React, { useState } from 'react'
import { Button, TextField, Form, FormProps, toast, TextareaField } from '@payloadcms/ui'
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

  const handleSubmit: FormProps['onSubmit'] = async (_, data) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/notification/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: data.title, body: data.message }),
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
      <div className="render-fields document-fields__fields">
        <TextField
          path="title"
          field={{
            name: 'title',
            label: 'Tiêu đề',
            type: 'text',
            required: true,
          }}
        />
        <TextareaField
          path="message"
          field={{
            name: 'message',
            label: 'Nội dung thông báo',
            type: 'textarea',
            required: true,
          }}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Đang gửi...' : 'Gửi thông báo'}
        </Button>
      </div>
    </Form>
  )
}
