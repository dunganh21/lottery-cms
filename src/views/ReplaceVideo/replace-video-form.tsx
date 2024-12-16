'use client'

import React, { useState } from 'react'
import { Button, TextField, Form, FormProps, toast } from '@payloadcms/ui'
import { FormState } from 'payload'
import qs from 'qs'

const initialFormState: FormState = {
  beforeLink: {
    value: '',
    initialValue: '',
    valid: true,
    errorMessage: '',
    validate: (value: string) => {
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
      return youtubeRegex.test(value) || 'Please enter a valid YouTube URL'
    },
  },
  afterLink: {
    value: '',
    initialValue: '',
    valid: true,
    errorMessage: '',
    validate: (value: string) => {
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
      return youtubeRegex.test(value) || 'Please enter a valid YouTube URL'
    },
  },
}

export const ReplaceVideoForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit: FormProps['onSubmit'] = async (fields, data) => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/replace-video?beforeLink=${data.beforeLink}&afterLink=${data.afterLink}`,
        {
          method: 'GET',
          credentials: 'include',
        },
      )

      if (!response.ok) {
        throw new Error()
      }

      const responseData = await response.json()
      if (responseData.count === 0) {
        toast.warning('Không tìm thấy video links để thay thế')
      } else {
        toast.success(`Thay thế thành công ${responseData.count} video links`)
        // Reset form
        fields.beforeLink.value = ''
        fields.afterLink.value = ''
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Có lỗi xảy ra khi thay thế video links')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit} initialState={initialFormState}>
      <div className="render-fields document-fields__fields">
        <TextField
          path="beforeLink"
          field={{
            name: 'beforeLink',
            label: 'Link youtube video gốc',
            type: 'text',
            required: true,
          }}
          validate={(value) => {
            const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
            return youtubeRegex.test(value || '') || 'Vui lòng nhập một URL YouTube hợp lệ'
          }}
        />
        <TextField
          path="afterLink"
          field={{
            name: 'afterLink',
            label: 'Link youtube video mới',
            type: 'text',
            required: true,
          }}
          validate={(value) => {
            const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
            return youtubeRegex.test(value || '') || 'Vui lòng nhập một URL YouTube hợp lệ'
          }}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Đang thay thế...' : 'Thay thế'}
        </Button>
      </div>
    </Form>
  )
}
