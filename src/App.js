import './App.css';
import React, { useState, useEffect } from 'react';
import useLocalStorage from './Hook/useLocalStorage';
import Docs from './component/Docs';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const [code, setCode] = useLocalStorage('code', '');
  const [compiled, setCompiled] = useState('Nothing to be rendered, try typing something in the Markdown tab.');
  const [view, setView] = useState('markdown'); // State to manage current view

  useEffect(() => {
    if (code) {
      setCompiled(code);
    }
  }, [code]);



  const buttonStyle = (currentView) => ({
    backgroundColor: view === currentView ? '#0093E9' : '#FBFBFB',
    color: view === currentView ? '#FBFBFB' : '#262834',
  });

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(e.target.value);
  };

  return (
    <Router>
      <h1>Markdown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={() => setView('markdown')} style={buttonStyle('markdown')}>Markdown</button>
          <button onClick={() => setView('preview')} style={buttonStyle('preview')}>Preview</button>
          <button onClick={() => setView('docs')} style={buttonStyle('docs')}>Docs</button>

        </div>
        {view === 'markdown' && (
          <div>
            <textarea placeholder='Write your markdown here...' onChange={handleChange} value={code} />
          </div>
        )}
        {view === 'preview' && (
          <div>
            <textarea value={compiled} readOnly style={{ cursor: 'default' }} />
          </div>
        )}
        {view === 'docs' && (
          <div>
            <Docs/>
          </div>
        )}
        
      </div>
    </Router>
  );
};

export default App;
