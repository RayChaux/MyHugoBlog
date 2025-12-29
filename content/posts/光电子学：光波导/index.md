+++
title = '光电子学：光波导'
date = '2025-12-28T10:48:45+08:00'
author = 'RayChaux'
draft = true
tags = ["课程笔记","光电子学"]
math = true
+++

光波导是一种利用“全反射”原理，把光信号限定在特定介质层内传输的光学结构，横向尺寸远大于光波长时，可忽略衍射，用几何光学就能描述其折线传播路径。通俗来说，就是有“导向”的光波，将光波限制在特定的区域内传播。
## 一、平面光波导
### 1.1 平面光波导结构
平面光波导（Planar Waveguide）的核心思路是把光“困”在一层高折射率薄膜里，让它只能沿薄膜平面传播。
<div align="center"> 
<img src="image.png" alt="平面光波导结构" width="600">
</div>  

其中，$n_3,n_1,n_2$从上到下依次为：  
**上包层（cladding/buffer）**：折射率 n₃，通常 n₃ ≤ n₂ < n₁，可把芯层“掩埋”起来，降低表面散射损耗；有时直接是空气（n₃≈1）；  
**芯层（film/core）**：折射率 n₁ 最高，厚度一般 1–10 µm，光主要在这里面传输；  
**衬底（substrate）**：折射率 n₂，略低于 n₁，起机械支撑作用，也是下包层。  
芯包入射角为：$\theta_{3c}=sin^{-1}\frac{n_3}{n_1}$；芯衬入射角为$\theta_{2c}=sin^{-1}\frac{n_2}{n_1}$，且有$\theta_{2c}>=\theta_{3c}$。
### 1.2 平面光波导内的光线传播
为了求解麦克斯韦方程，把电场/磁场按垂直于界面的分量来分类，于是出现了两种最干净的纯偏振：  
**TE极化**：电场<span style="color:#D6000F;">垂直</span>于界面（y方向）  
$$r_{TE}=\frac{n_1\cos\theta_i-i\sqrt{n_1^2\sin^2\theta_i-n_2^2}}{n_1\cos\theta_i+i\sqrt{n_1^2\sin^2\theta_i-n_2^2}}=e^{-i2\phi_{TE}}\longrightarrow\tan\phi_{TE}=\frac{\sqrt{n_1^2\sin^2\theta_i-n_2^2}}{n_1\cos\theta_i}=\frac{\sqrt{\beta^2-k_0^2n_2^2}}{\sqrt{k_0^2n_1^2-\beta^2}}\quad,\beta=k_0n_1\sin\theta_i$$
**TM极化**：电场<span style="color:#D6000F;">平行</span>于界面（y方向）
$$r_{TM}=\frac{n_2^2\cos\theta_i-in_1\sqrt{n_1^2\sin^2\theta_i-n_2^2}}{n_2^2\cos\theta_i+in_1\sqrt{n_1^2\sin^2\theta_i-n_2^2}}=e^{-i2\phi_{TM}}\longrightarrow\tan\phi_{TM}=\frac{n_1^2}{n_2^2}\cdot\frac{\sqrt{n_1^2\sin^2\theta_i-n_2^2}}{n_1\cos\theta_i}=\frac{n_1^2}{n_2^2}\cdot\frac{\sqrt{\beta^2-k_0^2n_2^2}}{\sqrt{k_0^2n_1^2-\beta^2}}$$
