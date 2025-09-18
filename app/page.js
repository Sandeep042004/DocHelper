'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! 🩺 I am Doctor Helper. I will help you book a hospital appointment.' }
  ])
  const [currentStep, setCurrentStep] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    severity: '',
    reason: '',
    date: '',
    time: ''
  })
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const timeOptions = ['09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM']
  const severityOptions = ['Mild', 'Moderate', 'Severe']
  const reasonOptions = ['Check-up', 'Surgery', 'Emergency', 'Other']
  const genderOptions = ['Male', 'Female', 'Other']

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Start flow
  useEffect(() => {
    if (currentStep === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages(prev => [...prev, { from: 'bot', text: "What is the patient's name?" }])
        setCurrentStep(1)
        setIsTyping(false)
      }, 1000)
    }
  }, [currentStep])

  // Auto-submit option
  const handleOptionSelect = (option) => {
    setMessages(prev => [...prev, { from: 'user', text: option }])
    handleSubmit(null, option)
  }

  // Handle submit
  const handleSubmit = (e, option = null) => {
    if (e) e.preventDefault()
    const value = option || inputValue
    if (!value) return

    if (!option) setMessages(prev => [...prev, { from: 'user', text: value }])

    let nextStep = currentStep + 1
    switch (currentStep) {
      case 1: setFormData(prev => ({ ...prev, name: value })); break
      case 2: setFormData(prev => ({ ...prev, age: value })); break
      case 3: setFormData(prev => ({ ...prev, gender: value })); break
      case 4: setFormData(prev => ({ ...prev, severity: value })); break
      case 5: setFormData(prev => ({ ...prev, reason: value })); break
      case 6: setFormData(prev => ({ ...prev, date: value })); break
      case 7: setFormData(prev => ({ ...prev, time: value })); break
      default: break
    }

    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      let botReply = ''
      switch (nextStep) {
        case 2: botReply = "What is the patient's age?"; break
        case 3: botReply = "Select gender:"; break
        case 4: botReply = "How severe are the symptoms?"; break
        case 5: botReply = "What is the appointment for?"; break
        case 6: botReply = "Please select the appointment date."; break
        case 7: botReply = "Now choose a time slot."; break
        case 8:
          botReply = `✅ Appointment Summary:\n\nName: ${formData.name}\nAge: ${formData.age}\nGender: ${formData.gender}\nSeverity: ${formData.severity}\nReason: ${formData.reason}\nDate: ${formData.date}\nTime: ${formData.time}\n\nDoctor Helper 🩺 will confirm your booking soon!`
          break
        default: break
      }

      setMessages(prev => [...prev, { from: 'bot', text: botReply }])
      setCurrentStep(nextStep)
      setIsTyping(false)
    }, 1000)
  }

  const renderOptions = (options) => (
    <div className="flex flex-wrap gap-2">
      {options.map((opt, idx) => (
        <motion.button
          key={opt}
          onClick={() => handleOptionSelect(opt)}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-400 transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          {opt}
        </motion.button>
      ))}
    </div>
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col h-[700px] border border-gray-200">
        {/* Header */}
        <div className="bg-green-500 text-white p-4 rounded-t-2xl font-bold text-lg flex items-center gap-2">
          🩺 Doctor Helper
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white flex flex-col">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-2xl max-w-[75%] w-auto inline-block break-words ${
                msg.from === 'bot'
                  ? 'bg-gray-200 text-black self-start'
                  : 'bg-green-500 text-white self-end'
              }`}
            >
              {msg.text.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </motion.div>
          ))}
          {isTyping && <div className="text-sm text-gray-400 italic">Doctor Helper is typing...</div>}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-200 bg-white">
          {currentStep === 3 ? renderOptions(genderOptions) :
           currentStep === 4 ? renderOptions(severityOptions) :
           currentStep === 5 ? renderOptions(reasonOptions) :
           currentStep === 6 ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="date"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 bg-white text-black focus:outline-none"
                required
              />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-full">Send</button>
            </form>
          ) : currentStep === 7 ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <select
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 bg-white text-black focus:outline-none"
                required
              >
                <option value="">Select time</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-full">Send</button>
            </form>
          ) : currentStep >= 1 && currentStep <= 2 ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type={currentStep === 2 ? 'number' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentStep === 1 ? "Enter name" : "Enter age"}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 bg-white text-black focus:outline-none"
                required
              />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-full">Send</button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  )
}