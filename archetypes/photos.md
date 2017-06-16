---
date: '{{ .Date }}'
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
description: ''
cover: ''
toc: false
tags: []
categories: ['摄影']
draft: true
---

{{< gallery columns="2" >}}

{{< figure
  src="https://example.org/photo.jpg"
  alt="Photo description"
  caption="Photo caption"
>}}

{{< /gallery >}}
