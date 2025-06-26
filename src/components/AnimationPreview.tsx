import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Define the structure for the component's props
interface AnimationPreviewProps {
  colors?: string[];
  speed?: number;
  blur?: number;
}

// Keyframe animations for the dots
const animationStyles = `
  @keyframes move-1 {
    0% { transform: translate(0, 0); }
    25% { transform: translate(60px, -60px); }
    50% { transform: translate(0, 0); }
    75% { transform: translate(-60px, 60px); }
    100% { transform: translate(0, 0); }
  }

  @keyframes move-2 {
    0% { transform: translate(0, 0); }
    25% { transform: translate(-60px, -60px); }
    50% { transform: translate(0, 0); }
    75% { transform: translate(60px, 60px); }
    100% { transform: translate(0, 0); }
  }

  @keyframes move-3 {
    0% { transform: translate(0, 0); }
    25% { transform: translate(0, -80px); }
    50% { transform: translate(0, 0); }
    75% { transform: translate(0, 80px); }
    100% { transform: translate(0, 0); }
  }
`;

const AnimationPreview: React.FC<AnimationPreviewProps> = ({
  colors = ['#ff5733', '#33ff57', '#3357ff'],
  speed = 4,
  blur = 10,
}) => {
  console.log('AnimationPreview loaded');

  // Define unique animations for each dot
  const animations = ['move-1', 'move-2', 'move-3'];

  return (
    <Card className="w-full h-full">
      <CardContent className="p-6 h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
        {/* Inject keyframe animations into the component scope */}
        <style>{animationStyles}</style>

        {/* SVG filter for the "gooey" effect */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </svg>

        {/* The container where the animation happens */}
        <div
          className="relative w-48 h-48"
          style={{ filter: 'url(#gooey-filter)' }}
        >
          {colors.map((color, index) => (
            <div
              key={index}
              className="absolute w-16 h-16 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                marginTop: '-32px', // half of height
                marginLeft: '-32px', // half of width
                backgroundColor: color,
                animationName: animations[index % animations.length],
                animationDuration: `${speed}s`,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimationPreview;