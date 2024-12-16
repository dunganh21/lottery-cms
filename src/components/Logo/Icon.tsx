import Image from 'next/image'
import React from 'react'
import LogoImage from './logo.png'

const Icon = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '100px',
          maxHeight: '100px',
          borderRadius: '10%',
          backgroundColor: '#00FFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src={LogoImage}
          alt="Logo"
          width={100}
          height={100}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  )
}

export default Icon
