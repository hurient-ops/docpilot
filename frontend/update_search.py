import os
import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\SearchScreen.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the top imports
content = content.replace("import React from 'react';", "import React, { useState } from 'react';\nimport { api } from '../../api';")

# Insert state at the beginning of the function
state_code = """export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [aiMode, setAiMode] = useState('local');
  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await api.hybridSearch(searchQuery, aiMode);
      setSearchResults(res.results || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
"""
content = content.replace("export default function SearchScreen() {", state_code)

# 1. Input
content = re.sub(
    r'<input className="w-full h-10 pl-10 pr-28 rounded-lg bg-surface-container text-text-primary font-body-default text-body-default placeholder-text-muted focus:outline-none focus:bg-white shadow-inner" id="query-input" placeholder="[^"]*" type="text" value="[^"]*"\s*/>',
    r'<input className="w-full h-10 pl-10 pr-28 rounded-lg bg-surface-container text-text-primary font-body-default text-body-default placeholder-text-muted focus:outline-none focus:bg-white shadow-inner" id="query-input" placeholder="검색어를 입력하세요..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />',
    content
)

# 2. Button 
content = re.sub(
    r'<button className="h-7 px-3 rounded-lg bg-primary-container text-white font-body-semibold text-body-dense flex items-center gap-1 hover:bg-primary transition-all">',
    r'<button onClick={handleSearch} disabled={loading} className="h-7 px-3 rounded-lg bg-primary-container text-white font-body-semibold text-body-dense flex items-center gap-1 hover:bg-primary transition-all">',
    content
)

# 3. Add results display at the very top of the results area
# I'll just look for the first `<div className="w-full flex flex-col gap-space-md">` and inject there
results_jsx = """
<div className="w-full flex flex-col gap-space-md">
  {searchResults.length > 0 && (
    <div className="w-full mb-4 bg-surface-container border border-primary p-4 rounded-lg">
      <h3 className="font-bold text-primary mb-2">실제 검색 결과 ({searchResults.length}건)</h3>
      {searchResults.map((res, idx) => (
        <div key={idx} className="mb-3 pb-3 border-b border-border-subtle last:border-0">
           <h4 className="font-semibold">{res.file_name}</h4>
           <div className="text-sm text-text-muted">{res.file_path} {res.location_badge}</div>
           <p className="text-sm italic" dangerouslySetInnerHTML={{__html: res.snippet}}></p>
        </div>
      ))}
    </div>
  )}
"""
content = content.replace('<div className="w-full flex flex-col gap-space-md">', results_jsx, 1)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated SearchScreen.tsx")
