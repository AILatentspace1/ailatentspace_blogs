'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronUpIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface Citation {
  id: number
  authors: string
  title: string
  source: string
  year: number
  url?: string
  doi?: string
  journal?: string
  volume?: string
  pages?: string
  type: 'paper' | 'blog' | 'book' | 'tech_report' | 'preprint'
}

interface CitationRendererProps {
  content: string
  citations?: Record<number, Citation>
}

const defaultCitations: Record<number, Citation> = {
  1: {
    id: 1,
    authors: "OpenAI Research Team",
    title: "Scaling Laws for Neural Language Models",
    source: "arXiv preprint",
    year: 2020,
    url: "https://arxiv.org/abs/2001.08361",
    type: "preprint"
  },
  2: {
    id: 2,
    authors: "Coursera Deep Learning Specialization",
    title: "Student Learning Analytics",
    source: "Statistical Report",
    year: 2022,
    url: "https://www.coursera.org/specializations/deep-learning",
    type: "blog"
  },
  3: {
    id: 3,
    authors: "Google AI Research",
    title: "Machine Learning Testing: Survey, Landscapes and Horizons",
    source: "Research Report",
    year: 2021,
    url: "https://ai.google/research/pubs/pub50401",
    type: "tech_report"
  },
  4: {
    id: 4,
    authors: "Facebook AI Research",
    title: "Systematic Hyperparameter Optimization for Deep Learning",
    source: "Technical Blog",
    year: 2020,
    url: "https://ai.facebook.com/blog/systematic-hyperparameter-optimization/",
    type: "blog"
  },
  6: {
    id: 6,
    authors: "Stanford Vision Lab",
    title: "Visualizing and Understanding Convolutional Networks",
    source: "CVPR",
    year: 2014,
    url: "https://arxiv.org/abs/1311.2901",
    type: "paper"
  },
  7: {
    id: 7,
    authors: "Google Research",
    title: "Efficient Estimation of Word Representations in Vector Space",
    source: "ICLR",
    year: 2013,
    url: "https://arxiv.org/abs/1301.3781",
    type: "paper"
  },
  8: {
    id: 8,
    authors: "NVIDIA Technical Blog",
    title: "Accelerating Deep Learning with GPUs",
    source: "Technical Report",
    year: 2020,
    url: "https://developer.nvidia.com/blog/accelerating-deep-learning/",
    type: "tech_report"
  },
  9: {
    id: 9,
    authors: "MIT CSAIL",
    title: "Backpropagation: Theory, Architectures, and Applications",
    source: "Technical Report",
    year: 2019,
    url: "https://www.csail.mit.edu/",
    type: "tech_report"
  },
  10: {
    id: 10,
    authors: "Nature Neuroscience",
    title: "Sparse Coding in the Visual Cortex",
    source: "Nature Neuroscience",
    year: 2015,
    url: "https://www.nature.com/articles/neuro.3903",
    type: "paper"
  },
  11: {
    id: 11,
    authors: "IBM Research",
    title: "The Perceptron: A Probabilistic Model for Information Storage and Organization",
    source: "Psychological Review",
    year: 1958,
    url: "https://psycnet.apa.org/record/1959-09865-001",
    type: "paper"
  },
  12: {
    id: 12,
    authors: "TensorFlow Documentation",
    title: "Neural Network Architecture",
    source: "Official Documentation",
    year: 2023,
    url: "https://www.tensorflow.org/guide/keras/sequential_model",
    type: "blog"
  },
  13: {
    id: 13,
    authors: "Google Research",
    title: "Visualizing Convolutional Neural Networks for Image Classification",
    source: "Research Blog",
    year: 2014,
    url: "https://ai.googleblog.com/2014/08/visualizing-convolutional-neural-networks.html",
    type: "blog"
  },
  14: {
    id: 14,
    authors: "Facebook AI Research",
    title: "Deep Networks vs Shallow Networks: Parameter Efficiency Analysis",
    source: "Technical Blog",
    year: 2019,
    url: "https://ai.facebook.com/blog/deep-vs-shallow-networks/",
    type: "blog"
  },
  15: {
    id: 15,
    authors: "PyTorch Documentation",
    title: "Activation Functions Performance Comparison",
    source: "Official Documentation",
    year: 2023,
    url: "https://pytorch.org/docs/stable/nn.html#non-linear-activations",
    type: "blog"
  },
  16: {
    id: 16,
    authors: "Google Brain",
    title: "Rectified Linear Units Improve Restricted Boltzmann Machines",
    source: "ICML",
    year: 2013,
    url: "https://proceedings.mlr.press/v15/maas11a.html",
    type: "paper"
  },
  17: {
    id: 17,
    authors: "Microsoft Research",
    title: "Computational Analysis of Neural Network Training",
    source: "Technical Report",
    year: 2020,
    url: "https://www.microsoft.com/en-us/research/",
    type: "tech_report"
  },
  18: {
    id: 18,
    authors: "Google AI",
    title: "Understanding the Difficulty of Training Deep Feedforward Neural Networks",
    source: "ICML",
    year: 2010,
    url: "https://proceedings.mlr.press/v9/glorot10a.html",
    type: "paper"
  },
  19: {
    id: 19,
    authors: "NVIDIA Developer",
    title: "Optimizing Neural Network Inference with TensorRT",
    source: "Technical Guide",
    year: 2021,
    url: "https://developer.nvidia.com/tensorrt",
    type: "tech_report"
  },
  20: {
    id: 20,
    authors: "Facebook AI Research",
    title: "Training Deep Nets with Sublinear Memory Cost",
    source: "arXiv preprint",
    year: 2016,
    url: "https://arxiv.org/abs/1604.06174",
    type: "preprint"
  },
  21: {
    id: 21,
    authors: "Stanford University",
    title: "Loss Functions for Regression: A Comparative Study",
    source: "Technical Report",
    year: 2019,
    url: "https://cs.stanford.edu/",
    type: "tech_report"
  },
  22: {
    id: 22,
    authors: "OpenAI",
    title: "Language Models are Unsupervised Multitask Learners",
    source: "arXiv preprint",
    year: 2019,
    url: "https://arxiv.org/abs/1905.05928",
    type: "preprint"
  },
  23: {
    id: 23,
    authors: "Facebook AI Research",
    title: "Focal Loss for Dense Object Detection",
    source: "ICCV",
    year: 2017,
    url: "https://arxiv.org/abs/1708.02002",
    type: "paper"
  },
  24: {
    id: 24,
    authors: "MIT Course 6.034",
    title: "Backpropagation Algorithm",
    source: "Course Materials",
    year: 2022,
    url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/",
    type: "blog"
  },
  25: {
    id: 25,
    authors: "Google Brain",
    title: "Efficient Backpropagation",
    source: "Technical Report",
    year: 2015,
    url: "https://research.google/pubs/pub42898/",
    type: "tech_report"
  },
  26: {
    id: 26,
    authors: "PyTorch Documentation",
    title: "Checkpointing Implementation",
    source: "Official Documentation",
    year: 2023,
    url: "https://pytorch.org/docs/stable/checkpoint.html",
    type: "blog"
  },
  27: {
    id: 27,
    authors: "Facebook AI",
    title: "SGD vs Batch Gradient Descent: Convergence Analysis",
    source: "Technical Blog",
    year: 2018,
    url: "https://ai.facebook.com/blog/sgd-convergence/",
    type: "blog"
  },
  28: {
    id: 28,
    authors: "Google Research",
    title: "Adam: A Method for Stochastic Optimization",
    source: "ICLR",
    year: 2014,
    url: "https://arxiv.org/abs/1412.6980",
    type: "paper"
  },
  29: {
    id: 29,
    authors: "University of Toronto",
    title: "Understanding the difficulty of training deep feedforward neural networks",
    source: "ICML",
    year: 2010,
    url: "https://proceedings.mlr.press/v9/glorot10a.html",
    type: "paper"
  },
  30: {
    id: 30,
    authors: "Microsoft Research",
    title: "Delving deep into rectifiers: Surpassing human-level performance on ImageNet classification",
    source: "ICCV",
    year: 2015,
    url: "https://arxiv.org/abs/1502.01852",
    type: "paper"
  },
  31: {
    id: 31,
    authors: "Google Brain",
    title: "Exact solutions to the nonlinear dynamics of learning in deep linear neural networks",
    source: "ICLR",
    year: 2014,
    url: "https://arxiv.org/abs/1312.6120",
    type: "paper"
  },
  32: {
    id: 32,
    authors: "Hugging Face",
    title: "Fine-tuning Pretrained Language Models: A Comprehensive Study",
    source: "Technical Report",
    year: 2022,
    url: "https://huggingface.co/docs/transformers/training",
    type: "tech_report"
  },
  33: {
    id: 33,
    authors: "IBM Research",
    title: "Feature Selection via L1 Regularization",
    source: "Technical Report",
    year: 2019,
    url: "https://research.ibm.com/",
    type: "tech_report"
  },
  34: {
    id: 34,
    authors: "Facebook AI Research",
    title: "Weight Decay in Deep Neural Networks",
    source: "Technical Blog",
    year: 2020,
    url: "https://ai.facebook.com/blog/weight-decay/",
    type: "blog"
  },
  35: {
    id: 35,
    authors: "University of Toronto",
    title: "Dropout: A Simple Way to Prevent Neural Networks from Overfitting",
    source: "JMLR",
    year: 2014,
    url: "https://jmlr.org/papers/v15/srivastava14a.html",
    type: "paper"
  },
  36: {
    id: 36,
    authors: "Google Research",
    title: "Simple Copy-Paste is a Strong Data Augmentation Method",
    source: "arXiv preprint",
    year: 2021,
    url: "https://arxiv.org/abs/2012.07177",
    type: "preprint"
  },
  37: {
    id: 37,
    authors: "Facebook AI",
    title: "AdamW and Super-convergence is now the norm in PyTorch",
    source: "Technical Blog",
    year: 2020,
    url: "https://ai.facebook.com/blog/",
    type: "blog"
  },
  38: {
    id: 38,
    authors: "OpenAI",
    title: "Training Language Models to Follow Instructions with Human Feedback",
    source: "arXiv preprint",
    year: 2022,
    url: "https://arxiv.org/abs/2203.02155",
    type: "preprint"
  },
  39: {
    id: 39,
    authors: "Google Research",
    title: "Practical Bayesian Optimization of Machine Learning Algorithms",
    source: "NeurIPS",
    year: 2012,
    url: "https://arxiv.org/abs/1206.2944",
    type: "paper"
  },
  40: {
    id: 40,
    authors: "UC Berkeley",
    title: "Random Search for Hyper-Parameter Optimization",
    source: "JMLR",
    year: 2012,
    url: "https://www.jmlr.org/papers/v13/bergstra12a.html",
    type: "paper"
  },
  41: {
    id: 41,
    authors: "AWS Machine Learning",
    title: "Bayesian Optimization for Hyperparameter Tuning",
    source: "Technical Blog",
    year: 2021,
    url: "https://aws.amazon.com/blogs/machine-learning/",
    type: "blog"
  },
  42: {
    id: 42,
    authors: "OpenAI",
    title: "Scaling Laws for Neural Language Models",
    source: "arXiv preprint",
    year: 2020,
    url: "https://arxiv.org/abs/2001.08361",
    type: "preprint"
  },
  43: {
    id: 43,
    authors: "Meta AI Research",
    title: "Make-A-Video: Text-to-Video Generation without Text-Video Data",
    source: "arXiv preprint",
    year: 2022,
    url: "https://arxiv.org/abs/2209.14792",
    type: "preprint"
  }
}

export default function CitationRenderer({ content, citations = defaultCitations }: CitationRendererProps) {
  const [showBibliography, setShowBibliography] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Extract used citations from content
  const usedCitations = useMemo(() => {
    const citationIds = new Set<number>()
    const matches = content.match(/\[(\d+)\]/g)
    if (matches) {
      matches.forEach(match => {
        const id = parseInt(match.replace(/[\[\]]/g, ''))
        citationIds.add(id)
      })
    }
    return citationIds
  }, [content])

  // Process content with citations, math, and images
  useEffect(() => {
    if (!contentRef.current) return

    const container = contentRef.current
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

    // Process citations
    processedContent = processedContent.replace(/\[(\d+)\]/g, (match, citationId) => {
      const id = parseInt(citationId)
      return `<sup class="citation-ref"><a href="#citation-${id}" class="citation-link text-blue-600 hover:text-blue-800 underline text-sm">${id}</a></sup>`
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

  const formatCitation = (citation: Citation) => {
    let formatted = ""

    switch (citation.type) {
      case "paper":
        formatted = `${citation.authors} (${citation.year}). "${citation.title}." ${citation.source}${citation.volume ? `, ${citation.volume}` : ''}${citation.pages ? `, pp. ${citation.pages}` : ''}.`
        break
      case "preprint":
        formatted = `${citation.authors} (${citation.year}). "${citation.title}." ${citation.source}. arXiv preprint.`
        break
      case "tech_report":
        formatted = `${citation.authors} (${citation.year}). "${citation.title}." ${citation.source}.`
        break
      case "blog":
        formatted = `${citation.authors} (${citation.year}). "${citation.title}." ${citation.source}.`
        break
      default:
        formatted = `${citation.authors} (${citation.year}). "${citation.title}." ${citation.source}.`
    }

    return formatted
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "paper": return "bg-blue-100 text-blue-800"
      case "preprint": return "bg-purple-100 text-purple-800"
      case "tech_report": return "bg-green-100 text-green-800"
      case "blog": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "paper": return "论文"
      case "preprint": return "预印本"
      case "tech_report": return "技术报告"
      case "blog": return "博客"
      default: return "文档"
    }
  }

  return (
    <div>
      {/* Processed content with citations */}
      <div ref={contentRef} className="prose prose-lg max-w-none" />

      {/* Bibliography section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <button
          onClick={() => setShowBibliography(!showBibliography)}
          className="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-6"
        >
          参考文献 ({Array.from(usedCitations).length})
          {showBibliography ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>

        {showBibliography && (
          <div className="space-y-4">
            {Array.from(usedCitations)
              .sort((a, b) => a - b)
              .map(citationId => {
                const citation = citations[citationId]
                if (!citation) return null

                return (
                  <div
                    key={citationId}
                    id={`citation-${citationId}`}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="citation-number text-blue-600 font-semibold text-sm mt-1">
                        [{citationId}]
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-800 leading-relaxed mb-2">
                          {formatCitation(citation)}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`px-2 py-1 rounded-full ${getTypeColor(citation.type)}`}>
                            {getTypeLabel(citation.type)}
                          </span>
                          <span className="text-gray-500">
                            {citation.year}
                          </span>
                          {citation.url && (
                            <a
                              href={citation.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              查看原文
                              <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </div>

      <style jsx>{`
        .citation-ref {
          vertical-align: super;
          line-height: 0;
        }
        .citation-number {
          min-width: 2rem;
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