# A Pioneering Multimodal Discord Bot

Long before tech giants such as OpenAI and Anthropic began releasing their own large-scale multimodal models, there was an ambitious experiment to create a **holistic** multimodal assistant within a simple Discord bot environment. This project, presented here, represents a **forward-thinking** effort to integrate **speech recognition**, **OCR**, **image captioning**, **object detection**, **chat-based interaction**, and **language translation**—all **before** the mainstream breakthroughs of recent years. The result is a single codebase that provides a fascinating glimpse into how one might unify multiple AI components into a cohesive system for a variety of use cases.

---

## 1. Introduction

The goal of this project was to design a Discord bot capable of:
1. **Understanding spoken input** through speech-to-text.
2. **Analysing images** using object detection, captioning, and OCR.
3. **Generating text** responses, translations, and even TTS (text-to-speech) output.
4. **Bridging** user interactions seamlessly through Discord’s chat interface.

Given the complexity of integrating multiple services at once, it was a bold step towards holistic multimodal AI—**merging voice, text, and images** into a single user experience **well ahead** of mainstream players.  

---

## 2. Key Components

### 2.1 Speech Recognition & Text-to-Speech
- **Google Speech-to-Text (STT)** handles uploaded audio files, converting them into textual content for further analysis or direct chatbot replies.  
- **Google Text-to-Speech (TTS)** dynamically generates spoken responses, transforming textual answers back into audio to be played in Discord.

### 2.2 Image Processing
1. **Object Detection**: A YOLO-based module (`object_detection_yolo.py`) identifies objects within an image, returning bounding boxes and labels.  
2. **Dense Image Captioning**: The `img_cap` function merges detection results into a descriptive caption, giving users instant insights into image contents.  
3. **OCR with EasyOCR**: When text is present, `ocr_with_easyocr` reads characters from images, enabling text extraction and further analysis.

### 2.3 Conversational AI Integration
- **OpenAI API (GPT)**: The bot uses GPT-4 (and in earlier forms, GPT-3.5 or custom fine-tuned LLMs) to generate human-like responses.  
- **Llama Model**: A local instance of the Llama model allows for offline or alternative text generation, ensuring redundancy and experimentation with open-source LLMs.  
- **Papago Translation API**: Provides reliable, on-the-fly translations, bridging language barriers within Discord channels.

### 2.4 Async-Driven Architecture
- **aiohttp & aiofiles**: Asynchronous operations ensure the bot downloads and processes files without blocking other users.  
- **Discord.py**: The core library orchestrates real-time chat interactions, hooking into messages, attachments, and user commands.

---

## 3. Notable Functionalities

1. **Holistic Multimodality**  
   This Discord bot handles text, voice, and images in **one** place—an impressive feat accomplished without big-tech frameworks that emerged later.

2. **Dynamic Interaction Flow**  
   - If a user attaches an **audio file**, the bot detects it, converts the speech to text, and then processes it as a normal chat message.  
   - When an **image** is posted, the system decides whether to **perform OCR** or **describe** the scene, delivering real-time annotated insights.

3. **Language Transformation & TTS**  
   - **/trans** command prompts the bot to translate input messages into Korean (or other languages), bridging global communities.  
   - Built-in **text-to-speech** returns an **audio file** of the bot’s textual replies in the user’s chosen language.

4. **Seamless GPT and Llama Usage**  
   Users can freely switch between GPT-based interactions (via an OpenAI API call) and local Llama inference (`/llama` command), showcasing the project’s open, flexible design.

5. **Exception Handling & Autoscaling**  
   The code attempts retries on OpenAI calls, managing API or network issues gracefully, and can manage multiple users concurrently thanks to asynchronous code.

---

## 4. Code Overview

A high-level look at how the bot is structured:

```python
class JarvisBot:
    def __init__(self):
        self.intents = discord.Intents.default()
        self.intents.message_content = True
        self.client = discord.Client(intents=self.intents)
        self.openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
        self.setup_credentials()
        self.setup_clients()

    def setup_credentials(self):
        # Load environment variables (Discord token, Papago, STT key, etc.)
        ...

    def setup_clients(self):
        # Initialise Google SpeechClient and local Llama model
        ...

    async def GPT4(self, messages, max_tokens=200):
        # ChatGPT-4 API call
        ...

    async def LLAMA(self, messages, token=200, temp=0.8):
        # Local Llama inference
        ...

    async def lang_trans(self, input_string, source, target):
        # Papago translation
        ...

    async def speech_to_text(self, file):
        # Convert audio file to text using Google Speech-to-Text
        ...

    async def on_message(self, message):
        # Main event handler for Discord messages and attachments
        # Orchestrates logic for each command prefix (/trans, /llama, etc.)
        ...

    def run(self):
        # Launches the Discord bot
        ...
```

### 1. Credentials & Environment Variables
The bot relies on environment variables to store sensitive information (API keys, Papago secrets, etc.), ensuring secure deployment.

### 2. Discord Event Loop
A single on_message callback handles file attachments, text queries, and user commands in a centralised manner.

### 3. Asynchronous Operations
Streaming, large file uploads, and network calls are handled with async/await, preventing blocking operations and improving responsiveness.

---

## 5. Lessons Learned
- **Early Innovation**: Building this bot before major AI labs publicly launched their own multimodal solutions demonstrates a forward-looking vision, albeit in a modest environment like Discord.
- **Orchestration Complexity**: As separate modules (audio, image, chat, translation) converge, ensuring each step works seamlessly within the Discord chat flow requires careful async management.
- **Scalability & API Limits**: Integrating multiple services (OpenAI, Google Cloud, Papago) demands robust handling of quotas, rate limits, and potential downtime.

---

## 6. Conclusion
This Discord bot foreshadows the multimodal direction AI has taken, blending **speech, vision, text, and translation** in a single chat-based interface—**all** before many of today’s most advanced multimodal models were publicly available. Although overshadowed by the current wave of large-scale, big-tech solutions, this project remains a testament to **pioneering spirit** and a **proof of concept** that multiple AI modules can be unified elegantly.

It’s a **living snapshot** of how one developer dared to merge voice, images, and text-based intelligence into a real-time environment, well **ahead of the mainstream.** In many ways, it stands as a creative milestone, demonstrating the boundless potential of combining multiple AI capabilities to deliver richer, more natural user experiences.