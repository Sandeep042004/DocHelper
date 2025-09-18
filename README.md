# 🩺 Doctor Helper – Hospital Appointment Chatbot  

Doctor Helper is a conversational chatbot built with **Next.js**, **React**, and **Framer Motion** that helps patients book hospital appointments easily.  
It provides a simple, WhatsApp-style interface where patients can interact with the bot step by step, select options, and get a clear appointment summary.  

---

## 🚀 Features  

- 💬 **Conversational Flow** – Bot guides the patient step by step  
- 🟢 **Modern UI** – White background with green accents for a clean medical look  
- ⚡ **Quick Replies** – Option buttons for gender, severity, and reason (auto-submit)  
- 📅 **Date Picker** – Choose the appointment date  
- ⏰ **Time Slots** – Dropdown for available appointment times  
- 📝 **Appointment Summary** – Neatly formatted confirmation message  
- 🎬 **Smooth Animations** – Powered by Framer Motion  
- 📱 **Mobile-Friendly** – Works on all devices  

---

## 📋 Conversation Flow  

1. Greeting by **Doctor Helper** 🩺  
2. Ask for **patient's name**  
3. Ask for **age**  
4. Ask for **gender** (Male / Female / Other – buttons)  
5. Ask for **symptom severity** (Mild / Moderate / Severe – buttons)  
6. Ask for **appointment reason** (Check-up / Surgery / Emergency / Other – buttons)  
7. Ask for **date** (calendar input)  
8. Ask for **time** (dropdown menu)  
9. Display **appointment summary** ✅  

---

## 🛠️ Tech Stack  

- **Frontend:** Next.js (React)  
- **Styling:** Tailwind CSS  
- **Animations:** Framer Motion  

---

## 📦 Installation  

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/doctor-helper-chatbot.git
   cd doctor-helper-chatbot
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Run the development server  
   ```bash
   npm run dev
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000) 🚀  

---

## 🎨 Customization  

- Change **colors** in `page.js` (currently green + white)  
- Modify **appointment flow** inside `currentStep` switch logic  
- Update **options** (gender, severity, reasons, time slots) as needed  

---

## 📸 Screenshot  

> _(Add a screenshot or demo GIF of your chatbot UI here for better presentation.)_  

---

## ✅ Future Enhancements  

- Specialty/Doctor selection (Cardiologist, Orthopedic, Dermatologist, etc.)  
- Save appointment data to a database  
- Integrate with hospital’s backend system  
- Email/SMS confirmation  

---

## 👨‍⚕️ Author  

Built with ❤️ for smart hospitals and patients.  
