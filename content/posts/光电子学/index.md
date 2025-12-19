+++
date = '2025-11-29T17:02:54+08:00'
draft = false
title = '光电子学'
tags = ["课程总结", "光学"]
author = 'RayChaux'
math = true
+++

## 电光调制
### 电光效应原理
麦克斯韦物质方程组有$D=\varepsilon E$，$D$实际上反映了光波在介质中的偏振方向，经过推导，有
$$
\begin{bmatrix}
D_x \\
D_y \\
D_z
\end{bmatrix}=\varepsilon_0
\begin{bmatrix}
\varepsilon_x & 0 & 0 \\
0 &\varepsilon_y & 0 \\
0 & 0 & \varepsilon_z
\end{bmatrix}
\begin{bmatrix}
E_x \\
E_y \\
E_z
\end{bmatrix}
$$  
在外加电场的情况下，介电张量可以以描述为：
$\varepsilon(E_0)=\varepsilon+\Delta\varepsilon(E_0)$  
其中，$\varepsilon$为无电场时的介电张量，为对角矩阵，是一个对称张量，有$\varepsilon_{ij}=\varepsilon_{ji}$和$\Delta\varepsilon_{ij}=\Delta\varepsilon_{ji}$
![alt text](image.png)
折射率椭球的推导：
晶体中光波的电磁能密度可以写为：
$w_e=\frac{1}{2}E\cdot D=\frac{1}{2\varepsilon_0}(\frac{D^2_x}{\varepsilon_x}+\frac{D^2_y}{\varepsilon_y}+\frac{D^2_z}{\varepsilon_z})$  
令$\eta=[\eta_{ij}]=(\frac{\varepsilon}{\varepsilon_0})^{-1}=\varepsilon_r^{-1}$，即，$\eta_{ij}$为相对介电常数$\varepsilon_{ij}$的倒数，使折射率椭球方程更简洁，有
![alt text](image-1.png)
电光效应一般是根据相对不渗透张量元素的变化来定义的  
![alt text](image-3.png)
其中，$\eta_{ij}=\eta_{ij}(0)$，为与电场无关项，$r_{ijk}$为与电场相关的一阶项（Pockels因子），$s_{ijkl}$为二阶项（Kerr因子）。  
根据$\varepsilon$的对称性质，有$\eta_{ij}=\eta_{ji}$和$\Delta\eta_{ij}=\Delta\eta_{ji}$，将$ij$根据下面的对应关系简化为单个参数$\alpha$，得到简化后的表达式。
![alt text](image-4.png)
在主坐标系中，
![alt text](image-2.png)
外加电场时，
![alt text](image-5.png)
得到新的折射率椭球方程为
![alt text](image-6.png)