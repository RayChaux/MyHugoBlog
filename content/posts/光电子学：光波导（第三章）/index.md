+++
title = '光电子学：光波导（第三章）'
date = '2025-12-28T10:48:45+08:00'
author = 'RayChaux'
draft = false
tags = ["课程笔记","光电子学"]
math = true
+++

光波导是一种利用“全反射”原理，把光信号限定在特定介质层内传输的光学结构，横向尺寸远大于光波长时，可忽略衍射，用几何光学就能描述其折线传播路径。通俗来说，就是有“导向”的光波，将光波限制在特定的区域内传播。
## 3.1 平面光波导
研究光波导常用的两种理论分别是射线光学理论和电磁理论。本节将围绕平板波导中光传播的射线光学模型展开探讨与推导，借助射线光学理论介绍平板波导的基本概念与相关理论，涉及光波导的传播模式（导模）、传播常数、有效波导厚度、波导截止波长、归一化频率等核心内容。
### 3.1.1 平面光波导结构
平面光波导（Planar Waveguide）的核心思路是把光“困”在一层高折射率薄膜里，让它只能沿薄膜平面传播。
<div align="center"> 
<img src="image.png" alt="平面光波导结构" width="600">
</div>  

其中，$n_3,n_1,n_2$从上到下依次为：  
**上包层（cladding/buffer）**：折射率 n₃，通常 n₃ ≤ n₂ < n₁，可把芯层“掩埋”起来，降低表面散射损耗；有时直接是空气（n₃≈1）；  
**芯层（film/core）**：折射率 n₁ 最高，厚度一般 1–10 µm，光主要在这里面传输；  
**衬底（substrate）**：折射率 n₂，略低于 n₁，起机械支撑作用，也是下包层。  
芯包入射角为：$\theta_{3c}=sin^{-1}\frac{n_3}{n_1}$；芯衬入射角为$\theta_{2c}=sin^{-1}\frac{n_2}{n_1}$，且有$\theta_{2c}>=\theta_{3c}$。


### 3.1.2 全反射
当光从光密介质（折射率高）射向光疏介质（折射率低）时，会发生反射和折射现象。当入射角满足特定条件时，将出现全反射现象，这是光波导能够约束光传播的核心物理机制。
1. 关键条件
    - 折射率关系：$n_1 > n_2$（芯层为光密介质，相邻介质为光疏介质）；
    - 临界角：$\theta_c = \sin^{-1}\frac{n_2}{n_1}$，即刚好发生全反射时的入射角；
    - 全反射条件：入射角$\theta_i > \theta_c$，此时反射系数的模$|r| = 1$，光几乎全部反射，无折射光（折射光退化为倏逝波）；
    - 非全反射情况：$\theta_i < \theta_c$时，反射系数$r$为实数，反射率$0 < R < 1$，部分光反射，部分光折射。
2. 偏振相关的反射特性
    为了求解麦克斯韦方程，把电场/磁场按垂直于界面的分量来分类，于是出现了两种最干净的纯偏振，对应的反射系数为：（由菲涅尔公式推导）  
    - TE偏振（横电波）：电场方向垂直于入射面，反射系数为
    $$r_{TE} = \frac{n_1 \cos\theta_i - i\sqrt{n_1^2 \sin^2\theta_i - n_2^2}}{n_1 \cos\theta_i + i\sqrt{n_1^2 \sin^2\theta_i - n_2^2}} = e^{-i2\phi_{TE}},$$  
    其中相位偏移$\phi_{TE}$满足$\tan\phi_{TE} = \frac{\sqrt{\beta^2 - k_0^2 n_2^2}}{\sqrt{k_0^2 n_1^2 - \beta^2}}$（$\beta = k_0 n_1 \sin\theta_i$为传播常数，$k_0 = \frac{2\pi}{\lambda}$为自由空间波数）；
    - TM偏振（横磁波）：电场方向平行于入射面，反射系数为  
    $$r_{TM} = \frac{n_2^2 \cos\theta_i - i n_1\sqrt{n_1^2 \sin^2\theta_i - n_2^2}}{n_2^2 \cos\theta_i + i n_1\sqrt{n_1^2 \sin^2\theta_i - n_2^2}} = e^{-i2\phi_{TM}},$$  
    相位偏移$\phi_{TM}$满足$\tan\phi_{TM} = \frac{n_1^2}{n_2^2} \cdot \frac{\sqrt{\beta^2 - k_0^2 n_2^2}}{\sqrt{k_0^2 n_1^2 - \beta^2}}$。
3. 波场分布
    - 导波（芯层内）：沿z方向（波导纵向）为行波，x方向（波导横向）为驻波，场表达式为$E_g = 2E_i \cos(hx - \delta_s) \exp i(\beta z - \omega t)$；  
    - 倏逝波（衬底层/覆盖层内）：沿x方向（远离芯层方向）振幅指数衰减，无能量传播，场表达式为$E_e = E_i \exp(-\alpha x) \exp i(\beta z - \omega t)$。  

**补充知识点**：倏逝波是全反射时的特殊现象，其振幅随远离分界面的距离指数衰减，穿透深度极浅（通常在波长量级），不会向外辐射能量，这一特性保证了光在波导芯层内的有效约束。

### 3.1.3 平板波导的模式
波导模式是指在波导纵向（z方向）振幅保持恒定的横向场分布，不同模式对应不同的场分布和传播特性。
1. 模式的数学描述
    - 对于平板波导，模式场不依赖于y坐标（横向一维约束），电场和磁场可表示为：$E_v(r,t) = \mathcal{E}_v(x) \exp i(\beta_v z - \omega t)$，$H_v(r,t) = \mathcal{H}_v(x) \exp i(\beta_v z - \omega t)$，其中$\mathcal{E}_v(x)$、$\mathcal{H}_v(x)$为横向场分布，$\beta_v$为该模式的传播常数，$v$为模式序号；
    - 传播常数范围：导模的传播常数满足$k_1 > \beta > k_2 \geq k_3$（$k_1 = k_0 n_1$、$k_2 = k_0 n_2$、$k_3 = k_0 n_3$分别为各层介质中的波数）。
2. 模式分类
    - 导模：满足$\theta_{3c} < \theta_{2c} < \theta_i$，光在芯层内通过全反射沿z方向锯齿形传播，无能量辐射到衬底层和覆盖层；
    - 衬底辐射模：满足$\theta_{3c} < \theta_i < \theta_{2c}$，光在芯层-覆盖层界面发生全反射，但在芯层-衬底层界面发生折射，能量辐射到衬底层；
    - 衬底-覆盖层辐射模：满足$\theta_i < \theta_{3c} < \theta_{2c}$，光在两个界面均发生折射，能量辐射到衬底层和覆盖层。

**补充知识点**：模式是波导的固有属性，不同模式的场分布、传播常数、截止特性均不同。导模是光波导中有用的传播模式，而辐射模会导致能量泄漏，不属于有效传播模式。

### 3.1.4 平板波导的本征方程
导模的传播需要满足相位匹配条件，即光在芯层内锯齿形传播一周后，总相位变化为$2m\pi$（$m$为非负整数），由此可推导得到本征方程，它决定了允许存在的导模及对应的传播常数。
1. 物理本质
光在芯层内沿锯齿形路径传播，从一点出发经过两次全反射（芯层-衬底层、芯层-覆盖层）后回到等效位置，总相位变化需为$2m\pi$（相长干涉条件），否则无法形成稳定的导模。
2. 本征方程推导
总相位变化包括光在芯层内传播的几何相位变化和全反射时的相位偏移，即：$k_0 n_1 \cdot 2d \cos\theta - 2\phi_{12} - 2\phi_{13} = 2m\pi$，化简后得到：$k_0 n_1 d \cos\theta - \phi_{12} - \phi_{13} = m\pi$（$m = 0,1,2,...$），其中$d$为芯层厚度，$\phi_{12}$、$\phi_{13}$分别为芯层-衬底层、芯层-覆盖层全反射时的相位偏移。
3. 简化形式
结合$h_1 = k_0 n_1 \cos\theta$（横向相位常数）、$\gamma_2 = \sqrt{\beta^2 - k_0^2 n_2^2}$（衬底层衰减常数）、$\gamma_3 = \sqrt{\beta^2 - k_0^2 n_3^2}$（覆盖层衰减常数），以及相位偏移与$h_1$、$\gamma_2$、$\gamma_3$的关系，本征方程可表示为：
    - TE模式：$h_1 d = m\pi + \tan^{-1}\left(\frac{\gamma_2}{h_1}\right) + \tan^{-1}\left(\frac{\gamma_3}{h_1}\right)$，进一步化简为$\tan(h_1 d) = \frac{h_1(\gamma_2 + \gamma_3)}{h_1^2 - \gamma_2 \gamma_3}$；
    - TM模式：$h_1 d = m\pi + \tan^{-1}\left(\frac{n_1^2}{n_2^2} \cdot \frac{\gamma_2}{h_1}\right) + \tan^{-1}\left(\frac{n_1^2}{n_3^2} \cdot \frac{\gamma_3}{h_1}\right)$，进一步化简为$\tan(h_1 d) = \frac{n_1^2 h_1(n_3^2 \gamma_2 + n_2^2 \gamma_3)}{n_2^2 n_3^2 h_1^2 - n_1^4 \gamma_2 \gamma_3}$。
4. 模式序号的物理意义
$m$为模式序号，$m = 0$对应基模（最低阶模式），$m \geq 1$对应高阶模式。$m$的取值为离散整数，表明只有特定入射角$\theta$和传播常数$\beta$的导模能够存在，即导模具有离散性。

**补充知识点**：本征方程是求解波导模式特性的核心方程，通过求解本征方程可得到各模式的传播常数、场分布等关键参数，其解的离散性源于相位匹配条件的严格约束。

### 3.1.5 有效折射率与参数范围
1. 有效折射率
定义有效折射率$n_\beta = \frac{\beta}{k_0}$，它是描述导模传播特性的重要参数，物理意义是导模在波导中传播的等效折射率。由$\beta = k_0 n_1 \sin\theta$可得$n_\beta = n_1 \sin\theta$，结合导模的入射角范围$\theta_2c < \theta < \frac{\pi}{2}$，有效折射率满足$n_1 > n_\beta > n_2 \geq n_3$。
2. 参数范围关联
- 芯层厚度$d$影响：$d$增大时，$n_\beta$增大并趋近于$n_1$，可支持更多高阶模式；$d$减小时，$n_\beta$减小并趋近于$n_2$，高阶模式逐渐被截止；
- 模式序号$m$影响：$m$增大时，$n_\beta$减小，对应的入射角$\theta$减小，模式的横向场分布振荡次数增多。

**补充知识点**：有效折射率是连接波导结构参数与传播特性的桥梁，通过测量有效折射率可反推波导的芯层折射率、厚度等关键参数，在波导设计和表征中具有重要应用。

### 3.1.6 传播常数的求解与特性
传播常数$\beta$是导模的核心参数，其值由波导结构参数（$n_1,n_2,n_3,d$）和光的波长（或频率）决定，可通过图形法或数值法求解。
1. 求解方法
    - 图形法：通过绘制$h_1 d$（与入射角$\theta$相关）和$\phi_{12} + \phi_{13}$（相位偏移之和）随$\theta$的变化曲线，曲线交点对应的$\theta$即为允许的入射角，进而可计算出$\beta$；
    - 数值法：利用迭代法、牛顿法等数值算法，代入波导结构参数和光的波长，直接求解本征方程得到$\beta$。
2. 关键特性
    - $\beta$与频率$\omega$的关系：$\omega$增大（波长$\lambda$减小）时，$\beta$增大并趋近于$k_1$，可支持的导模数量增多；$\omega$减小（波长$\lambda$增大）时，$\beta$减小并趋近于$k_2$，高阶模式逐渐被截止；
    - 截止特性：当$\beta = k_2$（即$n_\beta = n_2$）时，模式发生截止，对应的频率、波长、芯层厚度分别称为截止频率$\omega_c$、截止波长$\lambda_c$、截止厚度$d_c$；当$\omega < \omega_c$（或$\lambda > \lambda_c$、$d < d_c$）时，该模式为辐射模，无法在波导中稳定传播。

**补充知识点**：传播常数的大小直接反映了导模的传播速度（相速度$v_p = \frac{\omega}{\beta}$）和场分布特性，其截止特性是设计单模波导（仅支持基模）或多模波导（支持多个模式）的关键依据。

### 3.1.7 穿透深度与有效波导厚度
1. 穿透深度
由于倏逝波的存在，导模的能量会少量渗透到衬底层和覆盖层中，穿透深度定义为倏逝波振幅衰减到表面振幅$\frac{1}{e}$时的距离，反映了能量渗透的程度。
    - TE模式：衬底层穿透深度$x_2 = \frac{1}{\gamma_2} = \frac{1}{\sqrt{\beta^2 - k_0^2 n_2^2}}$，覆盖层穿透深度$x_3 = \frac{1}{\gamma_3} = \frac{1}{\sqrt{\beta^2 - k_0^2 n_3^2}}$；
    - TM模式：衬底层穿透深度$x_2 = \frac{1}{q_2 \gamma_2}$，覆盖层穿透深度$x_3 = \frac{1}{q_3 \gamma_3}$，其中$q_2 = \frac{n_\beta^2}{n_1^2} + \frac{n_\beta^2}{n_2^2} - 1$，$q_3 = \frac{n_\beta^2}{n_1^2} + \frac{n_\beta^2}{n_3^2} - 1$。
2. 有效波导厚度
有效波导厚度是指导模能量主要集中的区域厚度，考虑了芯层厚度和穿透深度，即：
    - TE模式：$d_{eff} = d + x_2 + x_3 = d + \frac{1}{\gamma_2} + \frac{1}{\gamma_3}$；
    - TM模式：$d_{eff} = d + \frac{1}{q_2 \gamma_2} + \frac{1}{q_3 \gamma_3}$。
3. 影响因素
有效波导厚度与模式序号相关：$m$增大（高阶模式）时，$n_\beta$减小，$\gamma_2$、$\gamma_3$减小，穿透深度增大，有效波导厚度增大，光的约束效果变差。

**补充知识点**：穿透深度和有效波导厚度是波导设计中需要考虑的重要参数，例如在集成光学中，有效波导厚度会影响器件的耦合效率和串扰特性，需通过优化波导结构减小能量渗透。

### 3.1.8 归一化波导参数
为了简化波导特性的分析和设计，引入归一化频率、归一化折射率和非对称因子三个关键归一化参数，使不同结构波导的特性具有可比性。
1. 归一化参数定义
    - 归一化频率$V$：$V = k_0 d \sqrt{n_1^2 - n_2^2} = \frac{2\pi d}{\lambda} \sqrt{n_1^2 - n_2^2}$，综合反映了芯层厚度、折射率差和光波长的影响，是决定波导支持模式数量的核心参数；
    - 归一化折射率$b$：$b = \frac{n_\beta^2 - n_2^2}{n_1^2 - n_2^2}$，描述有效折射率相对于衬底层折射率的提升程度，导模的$b$满足$0 < b < 1$；
    - 非对称因子$a$：$a = \frac{n_2^2 - n_3^2}{n_1^2 - n_2^2}$，反映波导衬底层与覆盖层的折射率不对称程度，对称波导的$a = 0$。
2. 归一化本征方程
将$h_1 = \frac{V \sqrt{1 - b}}{d}$、$\gamma_2 = \frac{V \sqrt{b}}{d}$、$\gamma_3 = \frac{V \sqrt{b + a}}{d}$代入原本征方程，得到归一化形式：
    - TE模式：$V \sqrt{1 - b} = m\pi + \tan^{-1}\left(\sqrt{\frac{b}{1 - b}}\right) + \tan^{-1}\left(\sqrt{\frac{b + a}{1 - b}}\right)$；
    - TM模式：$V \sqrt{1 - b} = m\pi + \tan^{-1}\left(\frac{n_1^2}{n_2^2} \sqrt{\frac{b}{1 - b}}\right) + \tan^{-1}\left(\frac{n_1^2}{n_3^2} \sqrt{\frac{b + a}{1 - b}}\right)$。
3. 截止条件与模式数量
    - 截止时$b = 0$，对应的归一化频率称为截止归一化频率$V_m^c$：
        - TE模式：$V_m^c = m\pi + \tan^{-1}\sqrt{a}$；
        - TM模式：$V_m^c = m\pi + \tan^{-1}\left(\frac{n_1^2}{n_3^2} \sqrt{a}\right)$。
    - 波导支持的模式数量：
        - TE模式：$M_{TE} = \left[\frac{V}{\pi} - \frac{1}{\pi} \tan^{-1}\sqrt{a}\right]_{int}$（$[\cdot]_{int}$表示取整数部分）；
        - TM模式：$M_{TM} = \left[\frac{V}{\pi} - \frac{1}{\pi} \tan^{-1}\left(\frac{n_1^2}{n_3^2} \sqrt{a}\right)\right]_{int}$。
4. 单模与多模波导
    - 单模波导：仅支持基模（$m = 0$），需满足$V_0^c < V < V_1^c$，其中$V_0^c$为基模截止归一化频率（对称波导$V_0^c = 0$）；
    - 多模波导：支持多个模式，满足$V > V_1^c$，$V$越大，支持的模式数量越多。

**补充知识点**：归一化参数是光波导分析的重要工具，通过$b-V$曲线可直观反映不同归一化频率下归一化折射率的变化，进而快速判断波导的模式数量和截止特性，广泛应用于波导设计和优化中。例如，设计单模光纤时，需将归一化频率$V$控制在2.405以下（对应圆波导的基模截止条件）。


## 3.2 光波导的电磁理论
### 核心概述
本节基于麦克斯韦方程组，解析纵向均匀光波导（折射率不随传播方向z变化）的场分布规律，明确波导模式的分类与特征，推导关键的场方程、波动方程及本征方程，同时介绍导模的功率传输与正交性原理，结合平板波导的具体案例帮助理解，为波导特性分析提供核心理论支撑。

## 3.2.1 波导模式的定义
波导模式是指在波导纵向（z方向）传播时，振幅保持恒定的横向场分布，其数学表达式为：
\[
\begin{cases}
\mathcal{E}_v(r, t) = \mathcal{E}_v(x, y) \exp[i(\beta_v z - \omega t)] \\
\mathcal{H}_v(r, t) = \mathcal{H}_v(x, y) \exp[i(\beta_v z - \omega t)]
\end{cases}
\]
- 核心参数：$\mathcal{E}_v(x, y)$、$\mathcal{H}_v(x, y)$为横向场分布（含x、y方向的横向分量和z方向的纵向分量），$\beta_v$为传播常数，$v=mn$为模式序号（m、n为横向维度的模式阶数）；
- 物理意义：不同模式对应不同的横向场分布和传播常数，体现波导对光场的约束与筛选特性。

## 3.2.2 场方程（纵向均匀波导）
### 1. 场分量的关联关系
通过麦克斯韦方程组推导，横向场分量（$\mathcal{E}_x,\mathcal{E}_y,\mathcal{H}_x,\mathcal{H}_y$）可由纵向场分量（$\mathcal{E}_z,\mathcal{H}_z$）完全确定，核心关系如下（$k^2 = \omega^2 \mu_0 \varepsilon = k_0^2 n^2(x, y)$，$k_0$为自由空间波数）：
\[
\begin{cases}
(k^2 - \beta^2)\mathcal{E}_x = i\beta \frac{\partial \mathcal{E}_z}{\partial x} + i\omega \mu_0 \frac{\partial \mathcal{H}_z}{\partial y} \\
(k^2 - \beta^2)\mathcal{E}_y = i\beta \frac{\partial \mathcal{E}_z}{\partial y} - i\omega \mu_0 \frac{\partial \mathcal{H}_z}{\partial x} \\
(k^2 - \beta^2)\mathcal{H}_x = i\beta \frac{\partial \mathcal{H}_z}{\partial x} - i\omega \varepsilon \frac{\partial \mathcal{E}_z}{\partial y} \\
(k^2 - \beta^2)\mathcal{H}_y = i\beta \frac{\partial \mathcal{H}_z}{\partial y} + i\omega \varepsilon \frac{\partial \mathcal{E}_z}{\partial x}
\end{cases}
\]
- 关键结论：只需求解纵向分量$\mathcal{E}_z$和$\mathcal{H}_z$，即可得到所有场分量，大幅简化求解过程。

### 2. 波导模式的分类
根据纵向分量的存在情况，波导模式分为4类，核心特征如下：
| 模式类型 | 纵向分量特征 | 关键说明 |
| --- | --- | --- |
| TEM模（横电磁模） | $\mathcal{E}_z=0$且$\mathcal{H}_z=0$ | 仅含横向分量，但介质波导（如光纤、平板波导）不支持此类模式 |
| TE模（横电波） | $\mathcal{E}_z=0$，$\mathcal{H}_z \neq 0$ | 电场无纵向分量，磁场有纵向分量 |
| TM模（横磁波） | $\mathcal{H}_z=0$，$\mathcal{E}_z \neq 0$ | 磁场无纵向分量，电场有纵向分量 |
| 混合模 | $\mathcal{E}_z \neq 0$且$\mathcal{H}_z \neq 0$ | 仅存在于二维横向约束波导（如圆波导、沟道波导），平板波导中不存在 |

### 3. 平板波导的场方程简化
平板波导的折射率仅随x方向变化（与y无关，$\frac{\partial}{\partial y}=0$），场分量进一步简化，仅存在TE模和TM模：
- TE模：仅含$\mathcal{E}_y$（横向电场）、$\mathcal{H}_x$（横向磁场）、$\mathcal{H}_z$（纵向磁场），满足$\mathcal{H}_z = \frac{1}{i\omega \mu_0} \frac{\partial \mathcal{E}_y}{\partial x}$；
- TM模：仅含$\mathcal{H}_y$（横向磁场）、$\mathcal{E}_x$（横向电场）、$\mathcal{E}_z$（纵向电场），满足$\mathcal{E}_z = -\frac{1}{i\omega \varepsilon} \frac{\partial \mathcal{H}_y}{\partial x}$。

## 3.2.3 波动方程
### 1. 一般波动方程
由麦克斯韦方程组进一步推导，场分量满足通用波动方程：
\[
\nabla^2 \mathcal{E} + k^2 \mathcal{E} = -\nabla\left(\frac{\nabla \varepsilon}{\varepsilon} \cdot \mathcal{E}\right)
\]
- 简化条件：当$\nabla \varepsilon = 0$（均匀介质区域，如阶跃波导的芯层、衬底层），场分量解耦，方程简化为亥姆霍兹方程，求解更便捷；
- 耦合情况：当$\nabla \varepsilon \neq 0$（折射率突变界面），各场分量相互耦合，需结合边界条件（场连续、导数连续）求解。

### 2. 阶跃折射率波导的波动方程
阶跃折射率波导的各区域（芯层、衬底层、覆盖层）折射率恒定，代入波导场表达式（含纵向传播项）后，横向波动方程为：
\[
\left(\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2}\right) \mathcal{E}_j(x, y) + (k_i^2 - \beta^2)\mathcal{E}_j(x, y) = 0
\]
\[
\left(\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2}\right) \mathcal{H}_j(x, y) + (k_i^2 - \beta^2)\mathcal{H}_j(x, y) = 0
\]
- 符号说明：$i$为区域序号（1=芯层、2=衬底层、3=覆盖层），$j$为场分量序号（x、y、z），$k_i = k_0 n_i$（$n_i$为对应区域的折射率）。

### 3. 平板波导的波动方程（一维简化）
平板波导与y无关（$\frac{\partial}{\partial y}=0$），波动方程简化为一维形式，核心求解分量如下：
- TE模：以$\mathcal{E}_y$为核心求解分量，方程为$\frac{\partial^2 \mathcal{E}_y}{\partial x^2} + (k_i^2 - \beta^2)\mathcal{E}_y = 0$；
- TM模：以$\mathcal{H}_y$为核心求解分量，方程为$\frac{\partial^2 \mathcal{H}_y}{\partial x^2} + (k_i^2 - \beta^2)\mathcal{H}_y = 0$。

## 3.2.4 波导模式的求解（阶跃平板波导）
### 1. 导模的条件与解的形式
导模需满足“芯层振荡、衬底/覆盖层衰减”的约束条件，即$k_1 > \beta > k_2 \geq k_3$（$k_1$为芯层波数，$k_2、k_3$为衬底、覆盖层波数），对应的波动方程解为：
- 芯层（$-d/2 < x < d/2$）：振荡解，$\mathcal{E}_y = C \cos(h_1 x - \psi)$（$h_1 = \sqrt{k_1^2 - \beta^2}$，$\psi$为相位偏移）；
- 衬底层（$x < -d/2$）：指数衰减解，$\mathcal{E}_y = C \exp[-\gamma_2(x + d/2)]$（$\gamma_2 = \sqrt{\beta^2 - k_2^2}$）；
- 覆盖层（$x > d/2$）：指数衰减解，$\mathcal{E}_y = C \exp[-\gamma_3(x - d/2)]$（$\gamma_3 = \sqrt{\beta^2 - k_3^2}$）。

### 2. 本征方程（特征方程）
利用界面处场的连续性条件（$\mathcal{E}_y$连续、$\partial \mathcal{E}_y/\partial x$连续），推导得到TE模的本征方程：
\[
h_1 d = m\pi + \tan^{-1}\left(\frac{\gamma_2}{h_1}\right) + \tan^{-1}\left(\frac{\gamma_3}{h_1}\right)
\]
简化形式：
\[
\tan(h_1 d) = \frac{h_1(\gamma_2 + \gamma_3)}{h_1^2 - \gamma_2 \gamma_3}
\]
- 模式序号：$m = 0,1,2,...$（$m=0$为基模，$m\geq1$为高阶模），对应芯层内场的振荡次数；
- TM模：本征方程形式类似，仅需引入折射率相关修正项，核心逻辑一致。

### 3. 模式场分布特征
- TE模场分布：$\mathcal{E}_y(x)$在芯层呈余弦振荡，在衬底和覆盖层沿远离芯层的方向指数衰减，无能量辐射（倏逝波特性）；
- 传播常数影响：$\beta$越大，$h_1$越大，芯层内振荡越密集，场约束越强，穿透到衬底/覆盖层的能量越少。

## 3.2.5 导模的功率与正交性
### 1. 导模的功率传输
导模的能量仅沿纵向（z方向）传输，模式功率为横向光强在整个横截面上的积分，核心公式如下：
\[
P_v = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} \frac{1}{2} \text{Re}\left(\mathcal{E}_v \times \mathcal{H}_v^* \cdot \hat{z}\right) dxdy
\]
简化表达式（更易计算）：
- TE模：$P_{TE} = \frac{2\beta_v}{\omega \mu_0} \int_{-\infty}^{\infty} |\mathcal{E}_y|^2 dx$；
- TM模：$P_{TM} = \frac{2\beta_v}{\omega} \int_{-\infty}^{\infty} \frac{1}{\varepsilon(x)} |\mathcal{H}_y|^2 dx$；
- 关键结论：纵向分量$\mathcal{E}_z、\mathcal{H}_z$不参与功率传输，仅横向分量贡献能量。

### 2. 模式的正交性与归一性
#### （1）正交性
无耗、各向同性波导中，不同模式间无功率耦合，满足正交性关系：
\[
\int_{-\infty}^{\infty} \int_{-\infty}^{\infty} \text{Re}\left(\mathcal{E}_v \times \mathcal{H}_\mu^* + \mathcal{E}_\mu^* \times \mathcal{H}_v\right) \cdot \hat{z} dxdy = \pm P_v \delta_{v\mu}
\]
- $\delta_{v\mu}$为克罗内克函数：$v=\mu$时为1（同模式），$v\neq\mu$时为0（不同模式）；
- 符号意义：“+”对应前向传播模，“-”对应后向传播模。

#### （2）归一性
将模式场归一化后（功率归一为1），正交性关系简化为：
\[
\int_{-\infty}^{\infty} \int_{-\infty}^{\infty} \text{Re}\left(\hat{\mathcal{E}}_v \times \hat{\mathcal{H}}_\mu^* + \hat{\mathcal{E}}_\mu^* \times \hat{\mathcal{H}}_v\right) \cdot \hat{z} dxdy = \pm \delta_{v\mu}
\]
- 物理意义：波导内任意光场可分解为各导模的线性叠加，模式构成一组正交基，为光场调控提供理论基础。

## 3.2.6 典型示例（光学知识应用）
### 示例1：平板波导无混合模的证明
平板波导中$\frac{\partial}{\partial y}=0$，场方程可分解为两组独立方程：
- 一组关联$\mathcal{H}_z、\mathcal{H}_x$与$\mathcal{E}_y$，定义TE模；
- 另一组关联$\mathcal{E}_z、\mathcal{E}_x$与$\mathcal{H}_y$，定义TM模；
- 结论：$\mathcal{E}_z$与$\mathcal{H}_z$完全解耦，无同时非零的情况，因此平板波导仅存在TE模和TM模，无混合模。

### 示例2：入射偏振与波导模式的耦合
不同偏振的入射光耦合到半导体平板波导时，模式激发规律如下：
- （a）线偏振平行于芯层边界：单模波导中仅激发TE模，多模波导中可激发单个或多个TE模；
- （b）线偏振垂直于芯层边界：单模波导中仅激发TM模，多模波导中可激发单个或多个TM模；
- （c）斜向线偏振：若波导同时支持TE和TM模，则两种模式均被激发；若单模非对称波导仅支持基模TE模，则仅激发TE基模；
- （d）圆偏振：本质是两个正交线偏振的叠加，激发规律与斜向线偏振一致，支持两种模式则均激发，仅支持TE基模则仅激发TE基模。