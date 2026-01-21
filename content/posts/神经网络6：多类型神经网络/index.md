+++
title = '深度信念网络'
date = '2026-01-06T10:43:17+08:00'
author = 'RayChaux'
draft = true
tags = ["神经网络","课程笔记"]
series = ["神经网络"]
series_order = 6
math = true
+++

## 
玻尔兹曼机是一个随机动力系统，每个变量的状态都以一定的概率受到其他变量的影响，是一种由二值随机神经元构成的两层对称连接神经网络模型。玻尔兹曼机可以用概率无向图来描述且图中的节点变量都具有二值性、全连接性和连接对称性3个重要性质。


### 1.1 图论基础
参考[图论基础和表示](https://www.runoob.com/data-structures/graph-theory.html)  

### 1.2 图神经网络的构建
任务：应用神经网络解决图或图的构成元素的分类、预测、生成、演化，按照应用层级分为节点、边、子图、图级别的任务。
方法：图表示学习
#### 节点嵌入（Node2Vec)
- 基于随机游走的方法（Random walk based on Deep-walk）  
  $$\mathcal{L}=\sum_{u\in V}\sum_{v\in N_{R}(u)}-\log\left(\frac{\exp(z_{u}^{\top}z_{v})}{\sum_{n\in V}\exp(z_{u}^{\top}z_{n})}\right)$$
  通过负采样，上面公式近似等于  
  $$\mathcal{L}\approx\log\left(\sigma(z_{u}^{\top}z_{v})\right)-\sum_{i=1}^{k}\log\left(\sigma\left(z_{u}^{\top}z_{n_{i}}\right)\right),n_{i}\sim P_{V}$$

### 1.3 图神经网络模型
#### 1.3.1 图卷积网络（GCN）