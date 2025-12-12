import {  useState } from "react";

export default function NotFoundPage() {

  const [text, setText] = useState("");
  
  function speak(text: string) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "vi-VN";
    utter.rate = 1;       // tốc độ
    utter.pitch = 1;      // cao độ
    window.speechSynthesis.speak(utter);
  }
    
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-2">404 - Không tìm thấy trang</h1>
      <p className="text-gray-600 mb-4">Đường dẫn bạn nhập không tồn tại.</p>
      <a href="/user" className="text-blue-500 underline">
        Quay về trang chủ
      </a>
      <input type="text" placeholder="Nhập văn bản" className="border border-gray-300 rounded p-2" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => speak(text)} className="bg-blue-500 text-white p-2 rounded">Speak</button>
    </div>
  );
}
