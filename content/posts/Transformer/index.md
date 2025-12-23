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




为什么要用位置Encoding?
