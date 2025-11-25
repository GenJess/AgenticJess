/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';

const CodeView: React.FC = () => {
  const [code, setCode] = useState('Loading source...');

  useEffect(() => {
    // Basic simulation of fetching source
    setCode(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Jesse | Systems & Synthesis</title>
  <meta name="description" content="Architecture of Intelligence">
  <!-- React Source Code Hidden for brevity -->
  <!-- ... -->
</head>
<body>
  <div id="root"></div>
</body>
</html>`);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 pt-32 min-h-screen animate-fade-in">
        <header className="mb-8">
            <h2 class="text-3xl font-display font-semibold text-white">Source Code Export</h2>
            <p className="text-zinc-500 mt-2">View the underlying architecture.</p>
        </header>

        <div className="relative">
            <textarea 
                className="w-full h-[600px] bg-[#0a0a0a] text-[#a5b3ce] border border-[#222] p-4 rounded-xl focus:outline-none resize-none font-mono text-xs leading-relaxed" 
                readOnly
                value={code}
            />
        </div>
    </section>
  );
};

export default CodeView;
