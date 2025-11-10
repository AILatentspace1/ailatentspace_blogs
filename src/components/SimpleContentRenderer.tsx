'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface SimpleContentRendererProps {
  content: string
  className?: string
}

export default function SimpleContentRenderer({
  content,
  className = ''
}: SimpleContentRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let processedContent = content

    // Process images with special syntax for animations
    processedContent = processedContent.replace(
      /!\[([^\]]*)\]\(([^)]+)\)\n\n> \*\*动画说明\*\*: ([^\n]+)/g,
      (match, alt, src, description) => {
        const processedSrc = src.replace('../../excalidraw-generator-output', '/images/excalidraw-generator-output')
          .replace('../../manim-animator-output', '/images/manim-animator-output')

        const isGif = src.toLowerCase().includes('.gif')

        return `
          <div class="content-image my-8">
            <div class="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <img
                src="${processedSrc}"
                alt="${alt}"
                class="w-full h-auto max-h-[500px] object-contain"
                loading="lazy"
              />
              ${isGif ? '<div class="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">动画</div>' : ''}
            </div>
            <div class="mt-3 text-center">
              <p class="text-sm font-medium text-gray-700 mb-1">${alt}</p>
              <p class="text-sm text-gray-600 italic">${description}</p>
            </div>
          </div>
        `
      }
    )

    // Process regular images
    processedContent = processedContent.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (match, alt, src) => {
        const processedSrc = src.replace('../../excalidraw-generator-output', '/images/excalidraw-generator-output')
          .replace('../../manim-animator-output', '/images/manim-animator-output')

        return `
          <div class="content-image my-8">
            <div class="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <img
                src="${processedSrc}"
                alt="${alt}"
                class="w-full h-auto max-h-[500px] object-contain"
                loading="lazy"
              />
            </div>
            <div class="mt-3 text-center">
              <p class="text-sm font-medium text-gray-700">${alt}</p>
            </div>
          </div>
        `
      }
    )

    // Process block math
    processedContent = processedContent.replace(/\$\$([^$]+)\$\$/g, (match, math) => {
      try {
        const renderedMath = katex.renderToString(math, {
          displayMode: true,
          throwOnError: false,
          output: 'html'
        })
        return `<div class="block-math my-4 overflow-x-auto">${renderedMath}</div>`
      } catch (error) {
        console.error('KaTeX rendering error:', error)
        return `<div class="text-red-500 my-4">数学公式渲染错误: ${math}</div>`
      }
    })

    // Process inline math
    processedContent = processedContent.replace(/\$([^$\n]+)\$/g, (match, math) => {
      try {
        const renderedMath = katex.renderToString(math, {
          displayMode: false,
          throwOnError: false,
          output: 'html'
        })
        return `<span class="inline-math">${renderedMath}</span>`
      } catch (error) {
        console.error('KaTeX inline rendering error:', error)
        return `<span class="text-red-500">数学公式错误: ${math}</span>`
      }
    })

    // Process citations (simplified)
    processedContent = processedContent.replace(/\[(\d+)\]/g, (match, citationId) => {
      return `<sup class="citation-ref text-gray-500 text-sm">[${citationId}]</sup>`
    })

    // Process headers
    processedContent = processedContent
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2 mt-4 text-gray-900">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-6 text-gray-900">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 mt-8 text-gray-900">$1</h1>')

    // Process lists
    processedContent = processedContent
      .replace(/^\* (.*$)/gim, '<li class="mb-2 text-gray-700 ml-6 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="mb-2 text-gray-700 ml-6 list-decimal">$1</li>')

    // Process text formatting
    processedContent = processedContent
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-600 hover:text-green-700 underline" target="_blank" rel="noopener noreferrer">$1</a>')

    // Process paragraphs
    processedContent = processedContent
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
      .replace(/^/, '<p class="mb-4 text-gray-700 leading-relaxed">')
      .replace(/$/, '</p>')

    // Set the processed content
    container.innerHTML = processedContent

  }, [content])

  return (
    <div className={`simple-content ${className}`}>
      <div ref={containerRef} className="prose prose-lg max-w-none" />

      <style jsx>{`
        .citation-ref {
          vertical-align: super;
          line-height: 0;
        }
        .block-math {
          display: block;
          text-align: center;
          padding: 1rem 0;
        }
        .inline-math {
          display: inline;
        }
        .content-image {
          scroll-margin-top: 2rem;
        }
      `}</style>
    </div>
  )
}