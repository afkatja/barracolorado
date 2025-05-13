// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock CSS.supports
Object.defineProperty(window, 'CSS', {
  writable: true,
  value: {
    supports: jest.fn().mockImplementation(property => {
      // Mock support for specific CSS features
      const supportedFeatures = {
        'animation-timeline: scroll()': false,
      }
      return supportedFeatures[property] || false
    }),
  },
})

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    getPropertyValue: jest.fn().mockImplementation(property => {
      // Mock CSS custom properties
      const customProperties = {
        '--header-height': '64px',
      }
      return customProperties[property] || ''
    }),
  })),
})

jest.mock('gsap', () => ({
  to: jest.fn(),
  from: jest.fn(),
  timeline: jest.fn(() => ({ to: jest.fn(), from: jest.fn() })),
  registerPlugin: jest.fn(),
  fromTo: jest.fn(),
  set: jest.fn(),
}));
jest.mock('gsap/ScrollTrigger', () => ({})); 