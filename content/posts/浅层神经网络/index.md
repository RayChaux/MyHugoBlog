+++
title = '浅层神经网络'
date = '2025-12-23T15:28:07+08:00'
author = 'RayChaux'
draft = false
tags = ["课程笔记","神经网络"]
math = true
+++

## 一、多层感知机与反向传播算法
### 1.1 单层感知机的问题
单层感知机（Rosenblatt）可以实现简单的分类问题，但不能解决异或问题。（异或逻辑运算从几何意义上讲是线性不可分的）  
MLP引入了隐藏层，和非线性激活函数，被证明具有通用逼近能力。MLP的基本结构如下图所示，其中每一个小球就代表一个神经元结构。  
<div style="text-align: center; overflow: hidden;">
    <img src="image.png" style="width: 60%; margin: 0 1%; float: left;" alt="图片1说明">
    <img src="image-1.png" style="width: 35%; margin: 0 1%; float: left;" alt="图片2说明">
</div>

图片来源：[MLP的理解（CSDN）](https://blog.csdn.net/m0_73798143/article/details/136636647)
### 1.2 基本BP算法
#### 1.2.1 权值确定方法
在某种最优准则下，通过学习确定网络的权值$W_{kj}^{KJ}$和$W_{ji}^{JI}$。  
有网络输出为：$o_k^K=f(net_k^K)$；
累加器输出为：$net_k^K=\sum\limits_{j=1}^{J}W_{kj}^{KJ}\cdot+o_j^J+b_k^K$  
定义损失函数：$E=\frac{1}{2} \sum\limits_{k=1}^K\left(d_k-o_k^K\right)^2$  
其中，$d_k$为输出层第k个神经元的期望输出，$o_k^K$为该神经元的实际输出。  
<div style="text-align: center; overflow: hidden;">
    <img src="单个神经元.png" style="width: 50%; margin: 0 1%; float: middle;" alt="图片1说明">
</div>

后一个神经元与前一个神经元权值的关系如下，难点在于求出其中的微分项。  
$$\begin{cases}
W_{k j}^{K J}(n+1)=W_{k j}^{K J}(n)-\eta_k\left(\frac{\partial E}{\partial W_{k j}^{K J}}\right) \\
W_{j i}^{J I}(n+1)=W_{j i}^{J I}(n)-\eta_j\left(\frac{\partial E}{\partial W_{j i}^{J I}}\right)
\end{cases}$$
根据以上式子，由链式求导法则可得：  
$$\begin{cases}
-\frac{\partial E}{\partial W_{k j}^{K J}}=\left(d_k-O_k^K\right) f^{\prime}\left(n e t_k^K\right) \cdot O_j^J\\
-\frac{\partial E}{\partial W_{j i}^{J I}}=\sum_{k=1}^K\left(d_k-O_k^K\right) f^{\prime}\left(n e t_k^K\right) W_{k j}^{K J} f^{\prime}\left(n e t_j^J\right) O_i^I
\end{cases}$$  
两式对照可得，本层误差信号 = 下一层误差信号累加和 * 本层激励函数的导数。  
定义输出层第k个神经元的误差信号：$\delta_k=-\frac{\partial E}{\partial n e t_k^K}=\left(d_k-O_k^K\right)f^{\prime}\left(n e t_k^K\right)$  
隐含层第j个神经元的误差信号为：$\delta_j=-\frac{\partial E}{\partial n e t_j^J}$  
将$\delta_k$带入$-\frac{\partial E}{\partial W_{k j}^{K J}}$，再带入$W_{k j}^{K J}(n+1)$，得到  
$$\begin{aligned} & W_{k j}^{K J}(n+1)=W_{k j}^{K J}(n)+\eta_k \cdot\delta_k O_j^J \\ & k=1,2 \cdots K ; j=1,2 \cdots J\end{aligned}$$  

#### 1.2.2 BP算法的特点
- 前馈式的：信号从前往后传播
- 误差从后往前传播
- 并行的：硬件实现速度快
- 层内无神经元连接


## 二、径向基函数RBF网络

## 三、概率PRBF神经网络

## 四、动态神经网络
