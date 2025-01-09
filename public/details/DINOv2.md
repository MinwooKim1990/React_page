# DINOv2 to TensorRT: Multi-Task Vision Model for Non-Destructive Inspection

This document provides a concise overview of a project that leverages the **DINOv2** backbone for multiple computer vision tasks—**image classification**, **depth estimation**, **object detection**, and **semantic segmentation**—then **optimises** these models using **TensorRT**. Although originally developed for **Non-Destructive Inspection (NDI)** of raw materials, the practical code here employs public datasets like CIFAR-10, Pascal VOC, and COCO for demonstrative purposes.

---

## 1. Introduction

- **Objective**: Develop a flexible deep learning model based on DINOv2 for multi-task computer vision:
  1. Classification
  2. Depth Estimation
  3. Object Detection
  4. Semantic Segmentation

- **NDI Focus**: Intended for non-destructive inspection of raw materials via x-ray images. However, because of confidentiality constraints, the demonstration uses standard datasets (e.g., CIFAR-10) in place of proprietary data.

- **TensorRT Deployment**: Models are optimised for inference speed on NVIDIA GPUs, significantly **reducing latency** whilst **maintaining accuracy**.

---

## 2. Datasets & Exploratory Data Analysis

### 2.1 Classification: CIFAR-10
- **Dataset**: 60,000 images (32×32) across 10 balanced classes.
- **Resizing**: Images upscaled to 224×224 to match the DINOv2 input size.
- **Normalisation**: Mean `[0.485, 0.456, 0.406]`, Std `[0.229, 0.224, 0.225]`.
- **Observations**: Balanced class distribution, diverse lighting conditions, robust training data.

### 2.2 Depth Estimation: Pascal VOC 2012
- **Repurposed**: Pascal VOC images resized to 224×224; synthetic or placeholder depth maps used.
- **Practical Note**: Real datasets like **NYU Depth V2** or **KITTI** are recommended for production-level depth estimation.

### 2.3 Object Detection: COCO
- **Dataset**: Over 200,000 images, 80+ categories.
- **Annotations**: Bounding boxes around various object instances.
- **Challenges**: Imbalanced class distribution, complex scenes, and small objects.

### 2.4 Semantic Segmentation: Pascal VOC 2012
- **Dataset**: 20 object categories + 1 background class, pixel-level annotations.
- **Preprocessing**: Images and masks resized to 224×224, normalisation, label encoding.

### 2.5 Image Dataset Preprocessing
- **General**: Resizing, normalisation, data augmentation for all tasks.
- **NDI-Specific** (conceptual only): Local Binary Patterns (LBP), contrast enhancement (e.g. CLAHE), edge detection, thresholding, etc.

---

## 3. Modelling Approach

- **Backbone: DINOv2**  
  A self-supervised Vision Transformer offering strong generalisation across tasks.

- **Task-Specific Heads**  
  1. **ClassificationHead** – Linear layer for predicting class logits.  
  2. **DepthEstimationHead** – Convolutional decoder for generating pixel-wise depth maps.  
  3. **ObjectDetectionHead** – YOLO-like architecture for bounding box regression and class probabilities.  
  4. **SemanticSegmentationHead** – Decoder network for pixel-level class predictions.

- **Training Strategy**  
  - **Data Augmentation**: Horizontal flips, random rotations, and colour jitter.  
  - **Loss Functions**: Cross-entropy (classification/segmentation), MSE (depth), YOLO-style (detection).  
  - **Optimiser**: Adam with learning rate = 0.001, weight decay = 1e-4.  
  - **Mixed Precision Training**: Reduces memory usage and speeds training.

- **NDI Preprocessing** (Conceptual):
  - Contrast enhancement, LBP, and edge detection for x-ray images.
  - Region-based segmentation (Watershed, Active Contour) for defect localisation.

---

## 4. Results

### 4.1 Classification (CIFAR-10)
- **Accuracy**: ~85% after 25 epochs.
- **Inference**: TensorRT provided ~40% reduction in latency, maintaining accuracy.

### 4.2 Depth Estimation (Placeholder Data)
- **Performance**: Reasonable on synthetic/repurposed data, real improvement expected with actual depth datasets.
- **Inference**: TensorRT accelerates speed, supporting near real-time depth prediction.

### 4.3 Object Detection (COCO)
- **Performance**: Preliminary; requires refined datasets/loss functions for optimal results.
- **Inference**: TensorRT significantly boosts detection speed, crucial for real-time applications.

### 4.4 Semantic Segmentation (Pascal VOC)
- **Pixel-wise Accuracy**: ~70% after 20 epochs.
- **Inference**: ~30% latency reduction via TensorRT, feasible for real-time segmentation tasks.

---

## 5. Discussion

- **Multi-Task Efficiency**: A shared DINOv2 backbone with specialised heads is highly modular and can tackle diverse tasks without separate training for each.
- **NDI Techniques**: While shown conceptually, these methods (e.g. LBP, contrast enhancement) are crucial in x-ray-based inspection workflows but not fully implemented here.
- **TensorRT Impact**: Remarkably improved inference times across all tasks, important for real-world scenarios where low latency is critical.

---

## 6. Conclusion & Future Work

### Conclusion
- **Robust Architecture**: The DINOv2 backbone excels across multiple vision tasks, with strong classification and segmentation results, plus promising directions for detection and depth.
- **NDI Relevance**: Specialised preprocessing (contrast, LBP, edge detection) is highly valuable for industrial x-ray inspection but awaits integration with suitable datasets.

### Future Work
1. **Dataset Integration**  
   - Adopt realistic depth datasets (NYU Depth V2, KITTI) and refine object detection on COCO for improved performance.  
   - Incorporate dedicated x-ray datasets (e.g. DAGM, MURA) to fully showcase NDI methods.

2. **Loss Function Enhancement**  
   - Explore YOLO/focal losses for detection, advanced losses for depth (e.g. Scale-Invariant), and more robust segmentation metrics.

3. **Scaling DINOv2**  
   - Experiment with larger models (DINOv2-L, DINOv2-G) and fine-tune hyperparameters to boost accuracy.

4. **Optimisation & Deployment**  
   - Investigate INT8 quantisation in TensorRT for further speed gains.  
   - Develop a user-friendly API for real-time or industrial deployment scenarios.

By pursuing these advancements, this project can evolve into a comprehensive multi-task solution for both academic research and industrial applications, offering **low-latency**, **high-accuracy** performance in critical inspection tasks.
