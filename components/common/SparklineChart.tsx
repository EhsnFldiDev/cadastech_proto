'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SparklineChartProps {
  data?: number[];
  color?: string;
  fillGradientStart?: string;
  fillGradientEnd?: string;
  height?: number;
  showPeakPoint?: boolean;
  className?: string;
}

export function SparklineChart({
  data = [30, 45, 38, 75, 52, 88, 70, 95],
  color = '#0284c7', // Sky / Accent
  fillGradientStart = '#0284c7',
  fillGradientEnd = '#ffffff',
  height = 70,
  showPeakPoint = true,
  className
}: SparklineChartProps) {
  const width = 240;
  const padding = 10;
  
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  // Calculate SVG points
  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((val - minVal) / range) * (height - 2 * padding);
    return { x, y, val };
  });

  // Find peak point
  const peakPoint = points.reduce((prev, curr) => (curr.val > prev.val ? curr : prev), points[0]);

  // Construct smooth bezier curve path
  const makeSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = makeSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const gradientId = `spark-grad-${Math.random().toString(36).substr(2, 6)}`;

  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fillGradientStart} stopOpacity="0.28" />
            <stop offset="100%" stopColor={fillGradientEnd} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* Smooth Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Peak Indicator Dot */}
        {showPeakPoint && (
          <g>
            <circle
              cx={peakPoint.x}
              cy={peakPoint.y}
              r="4.5"
              fill={color}
              className="animate-ping opacity-60"
            />
            <circle
              cx={peakPoint.x}
              cy={peakPoint.y}
              r="4"
              fill="#ffffff"
              stroke={color}
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
