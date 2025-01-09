# Scouter Project v1.0: Next-Generation AI-Powered Object Detection System

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![CUDA](https://img.shields.io/badge/CUDA-11.0+-green.svg)](https://developer.nvidia.com/cuda-toolkit)

## 🌟 Overview

Welcome to Scouter Project - a cutting-edge AI system inspired by Cyberpunk 2077's scanning technology. This revolutionary project combines state-of-the-art computer vision, natural language processing, and real-time enhancement capabilities to create an immersive and futuristic object detection experience.

### 🚀 Key Features

- **Zero-Shot Object Detection**: Advanced AI-powered detection system that can identify objects without prior training
- **Real-Time Enhancement**: CUDA-accelerated upscaling technology for crystal-clear object visualization
- **Multimodal Integration**: Seamlessly combines vision, speech, and language AI models
- **Cyberpunk-Style UI**: Futuristic overlay system inspired by Cyberpunk 2077
- **Voice Intelligence**: Built-in Speech-to-Text with LLM integration for intelligent responses
- **Smart Search**: Integrated Bing Search API for real-time object information retrieval

## 📸 Visual Showcase

### Main Interface
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/0779a6e0-684d-4cf6-89b1-b21d8f02f4b5" width="400" alt="Demo Screenshot 1"/></td>
    <td><img src="https://github.com/user-attachments/assets/857226e5-17fc-446c-8d08-b207f578cff0" width="400" alt="Demo Screenshot 2"/></td>
  </tr>
</table>

### GUI Interface
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/735d84b8-a426-4614-a867-d36b1c37e6bc" width="400" alt="Demo Screenshot 3"/></td>
    <td><img src="https://github.com/user-attachments/assets/e5db2cd5-2960-46e8-98bb-fc20fe054402" width="400" alt="Demo Screenshot 4"/></td>
  </tr>
</table>

### AI Assistant Interface
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/eed1b282-17d3-402b-be88-dfd9e63b588d" width="400" alt="Demo Screenshot 5"/></td>
    <td><img src="https://github.com/user-attachments/assets/715e3da5-1395-45f6-96e7-04b76cef8a7f" width="400" alt="Demo Screenshot 6"/></td>
  </tr>
</table>

## 🎯 Core Capabilities

### Advanced Object Detection
- Real-time object tracking with zero-shot capabilities
- Instant bounding box creation and tracking
- Cyberpunk-inspired visual overlay system

### AI-Powered Enhancement
- Real-time object upscaling using Fast-SRGAN
- Dynamic resolution enhancement
- Intelligent detail preservation

### Multimodal AI Integration
- Speech-to-Text with OpenAI Whisper
- Advanced language processing with multiple LLM options
- Seamless voice command integration

### Smart Information Retrieval
- Real-time Bing Search integration
- Automatic object information gathering
- Dynamic content display

## 🛠️ Technical Architecture

### State-of-the-Art AI Models
- **MobileSAM**: Optimized mobile-first object detection
- **Fast-SRGAN**: High-performance image upscaling
- **Florence 2**: Advanced image captioning
- **Multiple LLM Support**:
  - Google Gemini API
  - OpenAI GPT Models
  - Groq LLMs
  - Anthropic Claude Models

### Hardware Specifications
- **GPU**: NVIDIA CUDA-enabled GPU
  - Minimum VRAM: 8GB
  - Recommended: 24GB for real-time upscaling
  - Optimized for RTX 4090
- **System Requirements**:
  - Memory: 2GB minimum
  - Storage: 2.5GB
  - CUDA 11.0+

### Performance Metrics
- Base Processing: 30-40 FPS
- Heavy Workload: 10-20 FPS
- VRAM Usage: ~7GB (up to 21GB with upscaling)
- Optimized for 720P video processing

## 🎮 Interactive Controls

### Core Commands
| Action | Input | Function |
|--------|-------|----------|
| Object Detection | Left Click | Activate detection & tracking |
| Release Object | Right Click | Stop current tracking |
| Enhancement Toggle | F Key | Toggle real-time upscaling |
| Voice Recording | T Key | Control subtitle recording |
| Smart Search | S Key | Toggle object search |
| AI Assistant | A Key | Control LLM interaction |
| Playback Control | Space | Toggle video playback |
| Help Display | Tab | Toggle instruction overlay |

### Supported LLM Models
<table>
  <tr>
    <th>Provider</th>
    <th>Model</th>
  </tr>
  <tr>
    <td rowspan="4" align="center">Google</td>
    <td>gemini-2.0-flash-exp</td>
  </tr>
  <tr>
    <td>gemini-1.5-flash</td>
  </tr>
  <tr>
    <td>gemini-1.5-flash-8b</td>
  </tr>
  <tr>
    <td>gemini-1.5-pro</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">OpenAI</td>
    <td>gpt-4o-2024-08-06</td>
  </tr>
  <tr>
    <td>gpt-4o-mini-2024-07-18</td>
  </tr>
  <tr>
    <td>o1-2024-12-17</td>
  </tr>
  <tr>
    <td>gpt-3.5-turbo-0125</td>
  </tr>
  <tr>
    <td rowspan="5" align="center">GROQ</td>
    <td>llama-3.3-70b-versatile</td>
  </tr>
  <tr>
    <td>llama-3.2-90b-text-preview</td>
  </tr>
  <tr>
    <td>llama-3.2-11b-text-preview</td>
  </tr>
  <tr>
    <td>gemma2-9b-it</td>
  </tr>
  <tr>
    <td>mixtral-8x7b-32768</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">Anthropic</td>
    <td>claude-3-5-sonnet-20241022</td>
  </tr>
  <tr>
    <td>claude-3-opus-20240229</td>
  </tr>
  <tr>
    <td>claude-3-5-haiku-20241022</td>
  </tr>
</table>

## 🚀 Getting Started

### Quick Installation
```bash
# Clone repository
git clone https://github.com/MinwooKim1990/Scouter_PJ.git
cd Scouter_PJ

# Install dependencies
pip install -r requirements.txt

# Prepare data directory
mkdir data

# Launch application
python system.py --video path/to/video.mp4 --bing YOUR-API-KEY --llm-provider PROVIDER --llm-api-key API-KEY --llm-model MODEL
```

### GUI Launch
```bash
python tkinterapp.py
```

## 🔧 System Architecture

The Scouter Project implements a sophisticated multi-threaded architecture that enables real-time processing of multiple AI models simultaneously:

1. **Core Detection System**
   - Zero-shot object detection using MobileSAM
   - Real-time tracking implementation
   - CUDA-optimized processing pipeline

2. **Enhancement Pipeline**
   - Fast-SRGAN upscaling
   - Dynamic resolution management
   - Memory-optimized processing

3. **Voice Processing System**
   - Whisper STT integration
   - Real-time audio processing
   - Multi-threaded audio handling

4. **LLM Integration**
   - Multiple provider support
   - Asynchronous processing
   - Response optimization

## 📚 Technology Stack

### Core AI Models
- **MobileSAM**: [Ultralytics MobileSAM](https://docs.ultralytics.com/ko/models/mobile-sam/)
- **Fast-SRGAN**: [Fast-SRGAN Repository](https://github.com/HasnainRaz/Fast-SRGAN)
- **OpenAI Whisper**: [Whisper GitHub](https://github.com/openai/whisper)
- **Florence 2**: [Microsoft Florence](https://huggingface.co/microsoft/Florence-2-large)

### API Integrations
- **Bing Search**: [Documentation](https://learn.microsoft.com/en-us/bing/search-apis/bing-web-search/)
- **Google Gemini**: [API Documentation](https://ai.google.dev/gemini-api/docs/models/gemini)
- **OpenAI**: [API Reference](https://platform.openai.com/docs/api-reference)
- **Groq**: [Documentation](https://console.groq.com/docs)
- **Anthropic**: [Claude API](https://docs.anthropic.com/claude/docs)

## 📜 Licensing

This project is licensed under the MIT License. All components use either MIT or Apache-2.0 licenses, ensuring open-source compatibility and accessibility.

### API Compliance
Please ensure compliance with the terms of service for all integrated APIs:
- Bing Search API
- OpenAI API
- Google GenAI API
- Groq API
- Anthropic API

## 🔒 Security Note

For API key security:
- Use environment variables
- Implement secure key management
- Never expose keys in repositories

## 👥 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any enhancements.