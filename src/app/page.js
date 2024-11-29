'use client'

import { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"
import look from "../../public/look.png"
import Image from 'next/image'

export default function WeatherCheck() {
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [progress, setProgress] = useState(10)
  const [result, setResult] = useState('')

  const messages = [
    "Searching for location",
    "Opening wheather channel",
    "Asking from cloud",
    "Calling Thor for thunder updates",
  ];


  useEffect(() => {
    if (isLoading) {
      let currentMessageIndex = 0
      const messageInterval = setInterval(() => {
        setLoadingMessage(messages[currentMessageIndex])
        currentMessageIndex = (currentMessageIndex + 1) % messages.length
      }, 2000)

      const progressInterval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 10
          if (newProgress === 100) {
            clearInterval(progressInterval)
            clearInterval(messageInterval)
            setIsLoading(false)
            setResult("Look outside your window or search it on Google")
            return 100
          }
          return newProgress
        })
      }, 1000)

      return () => {
        clearInterval(messageInterval)
        clearInterval(progressInterval)
      }
    }
  }, [isLoading])

  const handleCheck = () => {
    if (location.trim() !== '') {
      setIsLoading(true)
      setProgress(0)
      setResult('')
    }
  }

  return (
    <div className="min-h-screen bg-black border-[1px] border-neutral-800 flex items-center justify-center text-white">
      <div className=" bg-black border-[1px] border-neutral-800 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather Check</h1>
        <div className="mb-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full px-3 py-2 border rounded-md bg-neutral-900 text-white placeholder-gray-400 border-neutral-700"
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={isLoading}
          className="w-full  bg-black border-[1px] border-neutral-800 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-800 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Checking...' : 'Check'}
        </button>
        {isLoading && (
          <div className="mt-4">
            <Progress value={progress} className="w-full h-2 bg-gray-700" />
            <p className="text-center mt-2">{loadingMessage}</p>
          </div>
        )}
        {result && (
          <>
            <Image
              src={look}
              width={500}
              height={700}
              alt='human with gun'
              className="w-[14rem] m-auto mt-4 object-cover overflow-hidden"
            />
            <div className="mt-4 text-center font-semibold text-green-400">
              {result}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

