import React, { useState, useMemo } from 'react';

// Import custom components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimationPreview from '@/components/AnimationPreview';
import ControlPanel from '@/components/ControlPanel';
import CodeOutput from '@/components/CodeOutput';

const AnimatorWorkspace = () => {
  console.log('AnimatorWorkspace loaded');

  // State management for animation properties
  const [colors, setColors] = useState<[string, string, string]>(['#ff5733', '#33ff57', '#3357ff']);
  const [speed, setSpeed] = useState(4); // in seconds
  const [blur, setBlur] = useState(20); // stdDeviation value
  const [size, setSize] = useState(64); // in pixels

  // Handlers to update state from the ControlPanel
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...colors] as [string, string, string];
    newColors[index] = color;
    setColors(newColors);
  };

  const handleSpeedChange = (value: number) => setSpeed(value);
  const handleBlurChange = (value: number) => setBlur(value);
  const handleSizeChange = (value: number) => setSize(value);
  
  // Memoized generation of HTML and CSS code for output
  const { htmlCode, cssCode } = useMemo(() => {
    const generatedHtml = `
<div class="gooey-container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
<!-- Gooey SVG Filter -->
<svg style="position: absolute; width: 0; height: 0;">
  <filter id="gooey-filter">
    <feGaussianBlur in="SourceGraphic" stdDeviation="${blur}" result="blur" />
    <feColorMatrix 
      in="blur" 
      mode="matrix" 
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
      result="gooey" 
    />
    <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
  </filter>
</svg>`;

    const generatedCss = `
.gooey-container {
  position: relative;
  width: 12rem; /* 192px */
  height: 12rem; /* 192px */
  filter: url(#gooey-filter);
}

.dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${size}px;
  height: ${size}px;
  margin-top: -${size / 2}px;
  margin-left: -${size / 2}px;
  border-radius: 9999px; /* rounded-full */
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-duration: ${speed}s;
}

.dot:nth-child(1) {
  background-color: ${colors[0]};
  animation-name: move-1;
}

.dot:nth-child(2) {
  background-color: ${colors[1]};
  animation-name: move-2;
}

.dot:nth-child(3) {
  background-color: ${colors[2]};
  animation-name: move-3;
}

@keyframes move-1 {
  0%, 50%, 100% { transform: translate(0, 0); }
  25% { transform: translate(60px, -60px); }
  75% { transform: translate(-60px, 60px); }
}

@keyframes move-2 {
  0%, 50%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-60px, -60px); }
  75% { transform: translate(60px, 60px); }
}

@keyframes move-3 {
  0%, 50%, 100% { transform: translate(0, 0); }
  25% { transform: translate(0, -80px); }
  75% { transform: translate(0, 80px); }
}
`;
    return { htmlCode: generatedHtml.trim(), cssCode: generatedCss.trim() };
  }, [colors, speed, blur, size]);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <Header />
      <main className="flex-1 w-full container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Controls and Code Output */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ControlPanel
              colors={colors}
              speed={speed}
              blur={blur}
              size={size}
              onColorChange={handleColorChange}
              onSpeedChange={handleSpeedChange}
              onBlurChange={handleBlurChange}
              onSizeChange={handleSizeChange}
            />
            <CodeOutput htmlCode={htmlCode} cssCode={cssCode} />
          </div>

          {/* Right Column: Animation Preview */}
          <div className="lg:col-span-2 lg:sticky top-24">
            <AnimationPreview
              colors={colors}
              speed={speed}
              blur={blur}
              // NOTE: The preview size is implicitly controlled by the generated CSS logic,
              // but the AnimationPreview component itself will use its own internal size logic.
              // We pass the other props for consistency.
            />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnimatorWorkspace;