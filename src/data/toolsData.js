// Official Registry of Published Tools by Do-Quick (doquick.in)
export const TOOLS_DATA = [
  {
    id: "quickqr",
    slug: "quickqr",
    name: "quickQr",
    tagline:
      "Free High-Speed QR Code & Bulk Barcode Generator with Logo Support",
    motto:
      "100% Free, privacy-first QR code and batch barcode generator for businesses, developers, and creators. Zero login required.",
    shortDesc:
      "Create free custom QR codes with company logos, multi-format retail barcodes, and mass bulk batch generation with printable PDF sheets and ZIP downloads. Runs 100% in your browser.",
    longDesc:
      "quickQr by Do-Quick is an industry-grade, open-source barcode and QR code generation suite. Designed for high-speed offline-first execution, quickQr processes everything locally on your device without storing your data on external servers. Features include custom logo embedding with automatic Level-H error correction, multi-standard linear barcodes (Code 128, EAN-13, UPC-A, Code 39, ITF-14), live print sheet previewing, and bulk export to PDF and ZIP archives.",
    category: "Generators",
    status: "Live Production",
    featured: true,
    version: "v1.2.0",
    license: "MIT",
    stars: 348,
    forks: 72,
    downloads: "24.8k",
    lastUpdated: "October 2026",
    liveUrl: "https://quickqr.doquick.in/",
    githubUrl: "https://github.com/Do-Quick/quickQr",
    cloneCommand: "git clone https://github.com/Do-Quick/quickQr.git",
    releaseArchiveUrl:
      "https://github.com/Do-Quick/quickQr/archive/refs/heads/main.zip",
    seoKeywords: [
      "free qr code generator",
      "bulk barcode generator",
      "qr code with logo",
      "batch barcode pdf generator",
      "free online barcode maker",
      "code 128 generator",
      "ean 13 generator",
      "upc barcode maker",
      "mass qr code download zip",
      "free printable barcode sheet",
    ],

    // Architecture & Implementation Details
    howItWorks: [
      {
        title: "1. In-Browser Client-Side Vector Computation",
        content:
          "All QR matrices and barcode symbologies are calculated directly in browser memory using HTML5 Canvas and SVG pipelines. Zero URLs, credentials, or sensitive product data are ever sent over the network, ensuring complete GDPR and enterprise privacy compliance.",
      },
      {
        title: "2. Automatic Level-H Error Correction for Logos",
        content:
          "When users upload a custom center logo, quickQr automatically switches the QR matrix engine to Error Correction Level H (30% redundancy) and calculates the quiet-zone mask to guarantee reliable scanning across all smartphone cameras and laser barcode readers.",
      },
      {
        title: "3. Multi-Standard Linear Barcode Generation",
        content:
          "Supports enterprise and retail symbologies including CODE128 (high-density alphanumeric), EAN-13, UPC-A, CODE39, ITF-14, and Pharmacode with strict checksum validation and selectable human-readable text labels.",
      },
      {
        title: "4. Batch Mass Grid & Printable PDF Sheet Composer",
        content:
          "The bulk engine renders hundreds of codes asynchronously without locking the UI thread. It dynamically formats multi-page printable PDF sheets with customizable margins, rows, columns, and cut-guides using jsPDF.",
      },
    ],

    // What We Implemented
    whatWeImplemented: [
      "Single & Bulk QR Code generation with custom color palettes, background transparency, and dot patterns",
      "Custom Logo & Icon embedding with safe-zone clipping and Level-H error correction",
      "Multi-standard linear barcodes (CODE128, EAN-13, UPC-A, CODE39, ITF-14, Pharmacode)",
      "High-resolution vector SVG and ultra-HD PNG downloads with custom pixel dimensions and DPI",
      "Mass Bulk Generator with live interactive print preview before downloading",
      "Printable PDF grid sheets with customizable rows, columns, margins, and item spacing",
      "One-click mass ZIP archive export containing individual named image files using JSZip",
      "Dual QR + Barcode combo mode with optional human-readable text label toggling",
      "Light, Dark, and System Theme synchronization with zero layout shift",
      "100% Client-Side execution — zero database, zero telemetry, zero login required",
    ],

    // Technologies Used
    technologies: [
      {
        name: "React 19",
        role: "UI Framework",
        desc: "Modern component architecture with concurrent rendering",
      },
      {
        name: "TypeScript",
        role: "Type Safety",
        desc: "Strict interface typing for barcode symbologies and export options",
      },
      {
        name: "Tailwind CSS",
        role: "Styling & Design",
        desc: "Responsive utility classes and dark/light mode theming",
      },
      {
        name: "Vite 8",
        role: "Build Tool",
        desc: "Lightning-fast compilation and optimized production tree-shaking",
      },
      {
        name: "QRCode Styling",
        role: "QR Matrix Engine",
        desc: "Canvas and SVG rendering with custom corners and dot shapes",
      },
      {
        name: "JsBarcode",
        role: "Barcode Engine",
        desc: "Standardized linear barcode generation for retail and logistics",
      },
      {
        name: "jsPDF",
        role: "PDF Engine",
        desc: "Dynamic client-side multi-page PDF generation for label sheets",
      },
      {
        name: "JSZip",
        role: "Archive Packager",
        desc: "In-memory asynchronous ZIP file packaging for bulk exports",
      },
      {
        name: "Lucide React",
        role: "Iconography",
        desc: "Lightweight, accessible SVG icon library",
      },
    ],

    // How to Download & Run Using GitHub
    downloadGuide: {
      prerequisites: [
        "Node.js v18.0 or higher",
        "npm, pnpm, or yarn package manager",
        "Git installed on your operating system",
      ],
      steps: [
        {
          command: "git clone https://github.com/Do-Quick/quickQr.git",
          description: "Clone the official repository from Do-Quick GitHub",
        },
        {
          command: "cd quickQr",
          description: "Navigate into the project directory",
        },
        {
          command: "npm install",
          description: "Install all project dependencies and build tooling",
        },
        {
          command: "npm run dev",
          description:
            "Start the local development server (runs on http://localhost:5174/)",
        },
        {
          command: "npm run build",
          description:
            "Compile optimized production static files into the /dist directory",
        },
      ],
    },

    // File Structure
    fileStructure: [
      "quickQr/",
      "├── src/",
      "│   ├── components/            # UI components",
      "│   │   ├── QrGenerator.tsx    # Single QR Code builder & logo overlay",
      "│   │   ├── BarcodeGenerator.tsx# Multi-standard linear barcode generator",
      "│   │   ├── BulkGenerator.tsx  # Mass generator with interactive layout preview",
      "│   │   ├── AdBanner.tsx       # Google AdSense unit & fallback sponsor",
      "│   │   ├── Header.tsx         # Navigation bar with theme toggle & links",
      "│   │   └── Footer.tsx         # Clean footer with privacy details",
      "│   ├── utils/                 # Core calculation & export engines",
      "│   │   ├── qrEngine.ts        # QR code styling and logo positioning",
      "│   │   ├── barcodeEngine.ts   # JsBarcode symbology encoder",
      "│   │   └── pdfBatchExporter.ts# jsPDF label grid composer & JSZip packager",
      "│   ├── types/                 # TypeScript interfaces and preset types",
      "│   ├── App.tsx                # Main view and tab navigation",
      "│   └── main.tsx               # React 19 entrypoint",
      "├── public/                   # Static public assets",
      "│   ├── ads.txt                # Google AdSense authorized sellers",
      "│   ├── robots.txt             # Web crawler directives",
      "│   └── sitemap.xml            # Search engine indexing map",
      "├── index.html                # HTML entry with AdSense verification meta tags",
      "├── package.json              # Dependencies and script definitions",
      "└── vite.config.ts            # Vite & Tailwind build configuration",
    ],

    // Contributors
    contributors: [
      {
        name: "Do-Quick Core Team",
        role: "Creator & Maintainer",
        github: "https://github.com/Do-Quick",
      },
      {
        name: "Open Source Community",
        role: "Contributors & Feedback",
        github: "https://github.com/Do-Quick/quickQr/graphs/contributors",
      },
    ],
  },
];

export const CATEGORIES = ["All", "Generators"];
