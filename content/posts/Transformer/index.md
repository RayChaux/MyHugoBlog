+++
date = '2025-12-05T17:02:54+08:00'
draft = false
title = 'Transformer网络'
author = 'RayChaux'
tags = ["课程笔记", "神经网络"]
math = true
+++

## 一、注意力与Transformer
Transformer是Google的团队在2017年提出的一种NLP经典模型，前两年比较火热的 Bert、GPT以及其他大语言模型也是基于 Transformer。Transformer模型使用了**Self-Attention机制**，不采用RNN的顺序结构，使得模型可以并行化训练，而且能够拥有全局信息。
### RNN中注意力的问题
注意力的核心：对输入的信息进行选择性关注





为什么要用位置Encoding?
为什么要用掩码？
为什么要用逐位置FFN？

## 二、Transformer与大语言模型
### 2.1 GPT
GPT(Generativee Pre-trained Transformer)，即生成式预训练Transformer，  
第一阶段：无监督的预训练
在一个大规模的文本数据集上学习一个高容量的语言模型，使模型学习一套初始参数（这个初始参数也就是Transformer中的Wq，Wk，Wv等），从而掌握在给定的上下文之后续写文本的能力。

第二阶段：有监督的微调
确保模型在特定任务上可以按照期望生成更精确的内容。

思考：怎么对相同的输入生成多个不同的结果？
引入随机性
为什么不对生成的结果直接评分？

### 2.2 BERT
(Bidirectional Encoder Representations from Transformers)
GPT的一种优化

## 三、Transformer与视觉模型
### 3.1 ViT
