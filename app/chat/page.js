'use client'
import { useState } from 'react'
import { openai } from '../api/openai'

export default function Generate () {
  const [text, setText] = useState('')
  const generateText = async () => {
    const prompt = 'Once upon a time'
    const response = await openai.complete(prompt)
    setText(response.choices[0].text)
  }
  return (
    <div>
      <button onClick={generateText}>Generate Text</button>
      <p>{text}</p>
    </div>
  )
}