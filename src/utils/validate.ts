export const validateYoutubeUrl = (value: any) => {
  if (!value) return true
  if (Array.isArray(value)) return 'YouTube link must be a single URL'

  try {
    const url = new URL(value)
    if (!url.hostname.includes('youtube.com')) {
      return 'Invalid YouTube video URL format'
    }

    const videoId = url.searchParams.get('v')
    if (!videoId || videoId.length !== 11) {
      return 'Invalid YouTube video ID'
    }

    return true
  } catch (error) {
    return 'Invalid URL format'
  }
}

export const validateFacebookUrl = (value: any) => {
  if (!value) return true
  if (Array.isArray(value)) return 'Facebook link must be a single URL'

  try {
    const url = new URL(value)
    if (!url.hostname.includes('facebook.com')) {
      return 'Invalid Facebook video URL format'
    }

    const videoId = url.searchParams.get('v')
    if (!videoId) {
      return 'Invalid Facebook video ID'
    }

    return true
  } catch (error) {
    return 'Invalid URL format'
  }
}

export const validateUrl = (value: any) => {
  if (!value) return true
  if (Array.isArray(value)) return 'Link must be a single URL'

  try {
    new URL(value)
    return true
  } catch (error) {
    return 'Invalid URL format'
  }
}

export const validateEmail = (value: any) => {
  if (!value) return true
  if (Array.isArray(value)) return 'Email must be a single email'

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(value)) {
    return 'Email không đúng định dạng'
  }

  return true
}

export const validateAge = (value: any) => {
  if (!value) return true
  if (Array.isArray(value)) return 'Age must be a single number'

  if (value < 18 || value > 100) return 'Tuổi phải nằm trong khoảng từ 18 đến 100'
  return true
}

export const validatePhoneNumber = (value: any) => {
  if (!value) return true // Cho phép trường này trống

  // Regex cho phép cả hai định dạng:
  // 1. Bắt đầu bằng 0, theo sau là 9-10 chữ số
  // 2. Bắt đầu bằng +, theo sau là 7-15 chữ số
  const phoneRegex = /^(0\d{9,10}|\+[1-9]\d{6,14})$/

  if (phoneRegex.test(value)) {
    return true
  }

  return 'Vui lòng nhập số điện thoại hợp lệ (Ví dụ: 0xxxxxxxxx hoặc +84xxxxxxxxx)'
}
