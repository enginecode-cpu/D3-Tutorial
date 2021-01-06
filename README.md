# D3-Tutorial

### D3 관련 태그 설명
태그|설명
---|:---
`<g></g>`|그룹으로 묶는 역할을 한다.
`<circle></circle>`|원을 생성하는 역할을 한다.
`<rect></rect>`|사각형을 만드는 역할을 한다.
`<path></path>`|선을 연결하는 역할을 한다.

### 1. svg 선택하기

```js
const svg = d3.select('svg');
```

### 2. 속성값 적용하기

사용방법
```js
svg.attr('속성', '값')
```
```js
svg.attr("width", window.innerWidth);
svg.attr("height", window.innerHeight);
```

### 3. svg 태그 안에 다른 태그 삽입하기
```js
svg.append(다른 태그)
```
```js
const g = svg.append("g");
```
svg 말고도 사용 가능하다.
```js
const circle = g.append('circle');
```