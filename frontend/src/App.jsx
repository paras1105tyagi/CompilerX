import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/themes/prism.css';
import axios from 'axios';
import './App.css';

function App() {
  // State to manage user's C++ code, input, output, and loading status
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    int  num1 , num2 ;
    cin >> num1 >> num2 ;

    cout << num1 + num2 << endl;
    return 0;
}`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to send code to backend for compilation and execution
  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setOutput('');

    const payload = {
      language: 'cpp',
      code,
      input,
    };

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.post(backendUrl, payload);
      setOutput(data.output);
    } catch (error) {
      // Handle different types of errors and show user-friendly messages
      if (error.response) {
        setOutput(`Error: ${error.response.data.error || 'Server error occurred'}`);
      } else if (error.request) {
        setOutput('Error: Could not connect to server.');
      } else {
        setOutput(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900 py-10 px-4 lg:px-24 font-sans overflow-hidden">
      {/* Animated background blobs */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        {/* Blob 1 */}
        <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 opacity-30 rounded-full blur-3xl animate-blob1" />
        {/* Blob 2 */}
        <div className="absolute bottom-[-100px] right-[-100px] w-[28rem] h-[28rem] bg-gradient-to-tr from-pink-300 via-indigo-300 to-purple-300 opacity-20 rounded-full blur-3xl animate-blob2" />
        {/* Blob 3 */}
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-tl from-purple-200 via-pink-200 to-indigo-200 opacity-20 rounded-full blur-2xl animate-blob3" style={{transform: 'translate(-50%, -50%)'}} />
      </div>

      {/* Header with logo and title */}
      <header className="flex items-center justify-center mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">X</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-indigo-700 drop-shadow-md">Compiler X</h1>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Code Editor Section */}
        <div className="lg:w-1/2 space-y-6">
          <div
            className="rounded-2xl shadow-lg border border-indigo-200 overflow-hidden bg-white transition-transform hover:scale-[1.01]"
            style={{ height: '420px', overflowY: 'auto' }}
          >
            {/* Code editor with C++ syntax highlighting */}
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => highlight(code, languages.cpp || languages.clike)}
              padding={16}
              style={{
                fontFamily: 'Fira Mono, monospace',
                fontSize: 15,
                height: '100%',
                overflowY: 'auto',
                outline: 'none',
                background: 'linear-gradient(90deg, #f3e8ff 0%, #e0e7ff 100%)',
              }}
            />
          </div>

          {/* Run button with loading state */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-lg shadow-md transition-all duration-200 ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600'
              }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.6 3.11a.375.375 0 0 1-.56-.327V8.887c0-.285.308-.465.56-.326l5.6 3.11z"
              />
            </svg>
            {isLoading ? 'Running...' : 'Run Code'}
          </button>
        </div>

        {/* Input and Output Section */}
        <div className="lg:w-1/2 space-y-8">
          {/* Input Box for program input */}
          <div>
            <label className="block text-base font-semibold text-indigo-700 mb-2">
              Program Input
            </label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={5}
              className="w-full p-4 border-2 border-indigo-200 rounded-xl text-base resize-none bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              placeholder="Input yha likho"
            />
          </div>

          {/* Output Display */}
          <div>
            <label className="block text-base font-semibold text-indigo-700 mb-2">
              Output
            </label>
            <div className="p-4 h-32 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-100 rounded-xl overflow-y-auto font-mono text-base shadow-inner">
              {output ? output : 'Bhai input to dede pehle...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;