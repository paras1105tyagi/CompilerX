import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import ReactMarkdown from 'react-markdown';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\n\nint main() {\n    int num1, num2, sum;\n    cin >> num1 >> num2;\n    sum = num1 + num2;\n    cout << "The sum of the two numbers is: " << sum;\n    return 0;\n}`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [aiReview, setAiReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleRun = async () => {
    const payload = {
      language: 'cpp',
      code,
      input
    };
    setLoading(true);
    setOutput('');
    try {
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL, payload);
      setOutput(data.output);
    } catch (error) {
      setOutput('Error executing code, error: ' + error.message);
    }
    setLoading(false);
  };

  const handleAiReview = async () => {
    const payload = {
      code
    };
    setAiLoading(true);
    setAiReview('');
    try {
      const { data } = await axios.post(import.meta.env.VITE_GOOGLE_GEMINI_API_URL, payload);
      setAiReview(data.review);
    } catch (error) {
      setAiReview('Error in AI review, error: ' + error.message);
    }
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn" style={{ background: 'none' }}>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center" style={{ letterSpacing: '0.02em' }}>Compiler X</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Code Editor Section */}
        <div className="clean-card flex flex-col mb-6 lg:mb-0">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Code Editor</h2>
          <div className="overflow-y-auto flex-grow mb-4" style={{ height: '350px' }}>
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => highlight(code, languages.js)}
              padding={15}
              style={{
                fontFamily: 'Fira code, Fira Mono, monospace',
                fontSize: 15,
                minHeight: '350px',
                background: 'transparent',
              }}
            />
          </div>
          <span className="text-xs text-gray-500 mb-2">Write or paste your C++ code here.</span>
        </div>
        {/* Input, Output, AI Review */}
        <div className="flex flex-col gap-6">
          {/* Input Box */}
          <div className="clean-card p-4">
            <h2 className="text-base font-semibold text-gray-700 mb-2">Input <span className="tooltip ml-1" title="Provide input values for your code.">🛈</span></h2>
            <textarea
              rows="3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input values..."
              className="w-full p-3 text-sm border border-gray-200 rounded-md resize-none bg-gray-50 text-gray-800"
            />
          </div>
          {/* Output Box */}
          <div className="clean-card p-4 overflow-y-auto" style={{ height: '100px' }}>
            <h2 className="text-base font-semibold text-gray-700 mb-2">Output <span className="tooltip ml-1" title="See the output of your code here.">🛈</span></h2>
            <div className="text-sm font-mono whitespace-pre-wrap text-gray-800">
              {loading ? <span className="loader"></span> : output}
            </div>
          </div>
          {/* AI Review Box */}
          <div className="clean-card p-4" style={{ height: '100px' }}>
            <h2 className="text-base font-semibold text-gray-700 mb-2">AI Review <span className="tooltip ml-1" title="Get instant AI feedback on your code.">🤖</span></h2>
            <div className="prose prose-sm text-gray-700 overflow-y-auto" style={{ height: '50px' }}>
              {aiLoading ? <span className="loader"></span> : (
                aiReview === '' ? <div>🤖</div> : <ReactMarkdown>{aiReview}</ReactMarkdown>
              )}
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleRun}
              className="flex-1 clean-btn"
              disabled={loading}
            >
              {loading ? 'Running...' : 'Run'}
            </button>
            <button
              onClick={handleAiReview}
              className="flex-1 clean-btn"
              disabled={aiLoading}
            >
              {aiLoading ? 'Reviewing...' : 'AI Review'}
            </button>
          </div>
        </div>
      </div>
      <footer className="mt-10 text-gray-400 text-sm">&copy; {new Date().getFullYear()} Compiler X. All rights reserved.</footer>
    </div>
  );
}

export default App;